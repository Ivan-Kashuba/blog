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

const PostDetailContainer = ({
  post,
  getChoosenPost,
  getCurrentUser,
  currentUser,
  getComments,
  postComments,
  createComment,
  updateComment,
}) => {
  const { postId } = useParams();

  useEffect(() => {
    getChoosenPost(postId);
    getCurrentUser();
    getComments(postId);
  }, []);

  const updateCommentHandler = async (commentId, text) => {
    await updateComment(commentId, text);
    getComments(post._id);
  };

  const isLikedPost = findLikeStatus(post, currentUser._id);

  const addComment = async (text, comentId) => {
    await createComment(post._id, text, comentId);
    getComments(post._id);
  };

  const likePost = async (id) => {
    await postsAPI.postLike(id);
    getChoosenPost(id);
  };

  const deleteComment = async (commentId) => {
    await commentsAPI.deleteComment(commentId);
    getComments(post._id);
  };

  const likeComment = async (commentId) => {
    await commentsAPI.likeComment(commentId);
    getComments(post._id);
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
        currentUserId={currentUser._id}
        deleteComment={deleteComment}
        updateCommentHandler={updateCommentHandler}
        likeComment={likeComment}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
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
