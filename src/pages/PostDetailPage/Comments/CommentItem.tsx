import React from "react";
import likeIcon from "./../../../img/like.png";
import likeActive from "./../../../img/likeActive.png";
import CommentEditForm from "./CommentEditForm";
import ReplyCommentForm from "./ReplyCommentForm";
import defaultAvatar from "./../../../img/defaultAvatar.png";
import { Comment, User } from "../../../types/models";

type props_T = {
  comment: Comment;
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  updateCommentHandler: (commentId: string, text: string) => void;
  likeComment: (commentId: string) => void;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  isLikedPost?: string;
  addComment?: (text: string, commentId: string) => void;
  commentMode?: boolean;
  setCommentMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isSubComment?: boolean;
  user?: User;
};

const CommentItem = ({
  comment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
  isEdit,
  setIsEdit,
  isLikedPost,
  addComment,
  commentMode,
  setCommentMode,
  isSubComment,
  user,
}: props_T) => {
  return (
    <>
      <div className="comment">
        <div>
          <img
            className="commentUserImage"
            src={
              user && user.avatar
                ? `http://test-blog-api.ficuslife.com${user.avatar}`
                : defaultAvatar
            }
            alt=""
          />
          <div>{user ? user.name : "Unknown"}</div>
        </div>

        <div className="commentItem">
          {!isEdit ? (
            <>
              <div>{comment.text}</div>
              <div className="commentLike">
                <div>
                  {comment.commentedBy === currentUserId && (
                    <div className="commentChangeContainer">
                      <div
                        onClick={() => setIsEdit!(true)}
                        className="commentChangeIcon"
                      >
                        &#9998;
                      </div>
                      <div
                        onClick={() => deleteComment(comment._id!)}
                        className="commentChangeIcon"
                      >
                        &#128465;
                      </div>
                    </div>
                  )}
                </div>
                <div className="commentLikeItem">
                  <div> {comment.likes?.length}</div>
                  <img
                    onClick={() => likeComment(comment._id!)}
                    className="commentLikeIcon"
                    src={isLikedPost ? likeActive : likeIcon}
                    alt=""
                  />
                  {!isSubComment && (
                    <div
                      className="commentReply"
                      onClick={() => setCommentMode!(!commentMode)}
                    >
                      Reply
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <CommentEditForm
              updateCommentHandler={updateCommentHandler}
              comment={comment}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
        {commentMode && (
          <ReplyCommentForm
            addComment={addComment!}
            commentId={comment._id!}
            setCommentMode={setCommentMode!}
          />
        )}
      </div>
    </>
  );
};

export default CommentItem;
