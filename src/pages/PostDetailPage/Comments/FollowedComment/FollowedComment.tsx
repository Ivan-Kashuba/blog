import React from "react";
import Preloader from "../../../../components/Preloader/Preloader";
import { findLikeStatus } from "../../../../utils/likeStatus";
import FollowedCommentItem from "./FollowedCommentItem";
import { Comment } from "../../../../types/models";

type props_T = {
  followedArr?: Array<Comment>;
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  updateCommentHandler: (commentId: string, text: string) => void;
  likeComment: (commentId: string) => void;
};

const FollowedComment = ({
  followedArr,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
}: props_T) => {
  return (
    <>
      {!followedArr ? (
        <Preloader />
      ) : (
        followedArr.map((subComment, index) => {
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
      )}
    </>
  );
};

export default FollowedComment;
