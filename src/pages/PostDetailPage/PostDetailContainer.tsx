import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { commentsAPI, postsAPI } from "../../api/api";
import Preloader from "../../components/Preloader/Preloader";
import PostDetails from "./PostDetails";
import Comments from "./Comments/Comments";
import { findLikeStatus } from "../../utils/likeStatus";
import { usePosts } from "../../hooks/usePosts";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";

export const PostDetailContainer = () => {
  const { post, getChoosenPost } = usePosts();
  const { comments, getComments, createComment, updateComment } = useComments();
  const { getCurrentUser, currentUser } = useAuth();

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
        postComments={comments}
        addComment={addComment}
        currentUserId={currentUser._id as string}
        deleteComment={deleteComment}
        updateCommentHandler={updateCommentHandler}
        likeComment={likeComment}
      />
    </>
  );
};
