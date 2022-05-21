import React, { useState } from "react";
import CommentItem from "../CommentItem";
import { Comment } from "../../../../types/models";

type props_T = {
  comment: Comment;
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  updateCommentHandler: (commentId: string, text: string) => void;
  likeComment: (commentId: string) => void;
  isLikedPost?: string;
};

const FollowedCommentItem = ({
  comment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
  isLikedPost,
}: props_T) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <CommentItem
      comment={comment}
      currentUserId={currentUserId}
      deleteComment={deleteComment}
      updateCommentHandler={updateCommentHandler}
      likeComment={likeComment}
      isLikedPost={isLikedPost}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      isSubComment={true}
    />
  );
};

export default FollowedCommentItem;
