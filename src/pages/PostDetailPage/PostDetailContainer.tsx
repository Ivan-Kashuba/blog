import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { commentsAPI, postsAPI } from "../../api/api";
import Preloader from "../../components/Preloader/Preloader";
import { getChoosenPost } from "../../store/reducers/posts-reducer";
import PostDetails from "./PostDetails";
import { getCurrentUser } from "../../store/reducers/auth-reducer";
import Comments from "./Comments/Comments";
import { getComments } from "../../store/reducers/comments-reducer";
import {
  createComment,
  updateComment,
} from "../../store/reducers/comments-reducer";
import { findLikeStatus } from "../../utils/likeStatus";
import { Comment, Post, User } from "../../types/models";
import { AppStateType } from "../../store/store";

type props_T = {
  post: Post;
  getChoosenPost: (postId: string) => void;
  getCurrentUser: () => void;
  currentUser: User;
  getComments: (postId: string) => void;
  postComments: Array<Comment>;
  createComment: (
    postId: string,
    text: string,
    comentId: string | null
  ) => void;
  updateComment: (commentId: string, text: string) => void;
};

const PostDetailContainer = ({
  post,
  getChoosenPost,
  getCurrentUser,
  currentUser,
  getComments,
  postComments,
  createComment,
  updateComment,
}: props_T) => {
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      getChoosenPost(postId);
      getCurrentUser();
      getComments(postId);
    }
  }, []);

  const updateCommentHandler = async (commentId: string, text: string) => {
    await updateComment(commentId, text);
    getComments(post._id!);
  };

  const isLikedPost = findLikeStatus(post, currentUser._id!);

  const addComment = async (text: string, comentId: string | null) => {
    await createComment(post._id!, text, comentId);
    getComments(post._id!);
  };

  const likePost = async (id: string) => {
    await postsAPI.postLike(id);
    getChoosenPost(id);
  };

  const deleteComment = async (commentId: string) => {
    await commentsAPI.deleteComment(commentId);
    getComments(post._id!);
  };

  const likeComment = async (commentId: string) => {
    await commentsAPI.likeComment(commentId);
    getComments(post._id!);
  };

  if (!post._id) {
    return <Preloader />;
  }
  return (
    <>
      <PostDetails post={post} likePost={likePost} isLikedPost={isLikedPost} />
      <Comments
        postComments={postComments}
        addComment={addComment}
        currentUserId={currentUser._id as string}
        deleteComment={deleteComment}
        updateCommentHandler={updateCommentHandler}
        likeComment={likeComment}
      />
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  post: state.posts.posts,
  currentUser: state.auth,
  postComments: state.comments.comments,
});

export default connect(mapStateToProps, {
  getChoosenPost,
  getCurrentUser,
  getComments,
  createComment,
  updateComment,
})(PostDetailContainer);
