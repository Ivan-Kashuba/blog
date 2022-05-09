import { Formik } from "formik";
import React from "react";
import { commentCreatorValidator } from "../../../validators/validators";
import CommentItemContainer from "./CommentItemContainer";

const Comments = ({
  postComments,
  addComment,
  currentUserId,
  deleteComment,
  updateCommentHandler,
  likeComment,
}) => {
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
                  addComment(values.text);
                  resetForm({ text: "" });
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
