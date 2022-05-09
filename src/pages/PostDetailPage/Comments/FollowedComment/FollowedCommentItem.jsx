import React, { useState } from "react";
import CommentItem from "./../CommentItem";

const FollowedCommentItem = ({
  comment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
  isLikedPost,
}) => {
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
