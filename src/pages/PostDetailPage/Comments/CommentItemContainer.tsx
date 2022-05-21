import React, { useEffect, useState } from "react";
import { usersAPI } from "../../../api/api";
import CommentItem from "./CommentItem";
import FollowedComment from "./FollowedComment/FollowedComment";
import { Comment } from "../../../types/models";

type props_T = {
  comment: Comment;
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  updateCommentHandler: (commentId: string, text: string) => void;
  likeComment: (commentId: string) => void;
  addComment: (text: string, commentId: string) => void;
};

const CommentItemContainer = ({
  comment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
  addComment,
}: props_T) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getPostUser = async () => {
      const response = await usersAPI.getChoosenUser(comment.commentedBy!);
      setUser(response.data);
    };
    if (comment.commentedBy) {
      getPostUser();
    }
  }, []);
  const [isEdit, setIsEdit] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const isLikedPost = comment.likes?.find((id) => {
    if (id === currentUserId) {
      return id;
    }
    return undefined;
  });
  return (
    <>
      <CommentItem
        comment={comment}
        currentUserId={currentUserId}
        deleteComment={deleteComment}
        updateCommentHandler={updateCommentHandler}
        likeComment={likeComment}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isLikedPost={isLikedPost}
        addComment={addComment}
        commentMode={commentMode}
        setCommentMode={setCommentMode}
        user={user}
      />
      <div className="subComments">
        <FollowedComment
          followedArr={comment.followedArr}
          currentUserId={currentUserId}
          deleteComment={deleteComment}
          updateCommentHandler={updateCommentHandler}
          likeComment={likeComment}
        />
      </div>
    </>
  );
};

export default CommentItemContainer;
