import { Formik } from "formik";
import React from "react";
import { commentCreatorValidator } from "../../../validators/validators";
import CommentItemContainer from "./CommentItemContainer";
import { Comment } from "../../../types/models";

type props_T = {
  postComments: Array<Comment>;
  addComment: (text: string, comentId: string | null) => void;
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  updateCommentHandler: (commentId: string, text: string) => void;
  likeComment: (commentId: string) => void;
};

const Comments = ({
  postComments,
  addComment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
}: props_T) => {
  return (
    <div className="postDetailsContainer">
      <div className="commentsDetailsMainContent">
        <h2 className="commentsMainText">Comments</h2>
        <div className="commentContainer">
          <div>
            <div className="commentField">
              <Formik
                initialValues={{ text: "" }}
                validate={(values) => commentCreatorValidator(values)}
                onSubmit={(values, { resetForm }) => {
                  addComment(values.text, null);
                  resetForm({ values: { text: "" } });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit} className="commentFieldForm">
                    <div className="commentField">
                      <textarea
                        className="commentTextArea"
                        value={values.text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="text"
                      />
                      <button type="submit" className="commentFieldButton ">
                        Send
                      </button>
                    </div>
                    <div className="error">
                      {touched && errors ? errors.text : null}
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            {postComments.map((comment) => {
              return (
                <CommentItemContainer
                  comment={comment}
                  currentUserId={currentUserId}
                  deleteComment={deleteComment}
                  updateCommentHandler={updateCommentHandler}
                  likeComment={likeComment}
                  key={comment._id}
                  addComment={addComment}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
