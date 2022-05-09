import React from "react";
import Preloader from "../../../../components/Preloader/Preloader";
import { findLikeStatus } from "./../../../../utils/likeStatus";
import FollowedCommentItem from "./FollowedCommentItem";

const FollowedComment = ({
  followedArr,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
}) => {
  if (!followedArr) {
    return <Preloader />;
  }
  return followedArr.length > 0
    ? followedArr.map((subComment, index) => {
        const isLikedPost = findLikeStatus(subComment, currentUserId);

        return (
          <div className="subComment" key={index}>
            <FollowedCommentItem
              comment={subComment}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              updateCommentHandler={updateCommentHandler}
              likeComment={likeComment}
              isLikedPost={isLikedPost}
            />
          </div>
        );
      })
    : null;
};

export default FollowedComment;
