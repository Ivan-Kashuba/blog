import { Formik } from "formik";
import React from "react";
import { commentCreatorValidator } from "../../../validators/validators";

const CommentEditForm = ({ comment, updateCommentHandler, setIsEdit }) => {
  return (
    <Formik
      initialValues={{ text: comment.text || "" }}
      validate={(values) => commentCreatorValidator(values)}
      onSubmit={(values, { resetForm }) => {
        updateCommentHandler(comment._id, values.text);
        setIsEdit(false);
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
        <form
          onSubmit={handleSubmit}
          className="commentFieldForm editCommentForm"
        >
          <div className="commentField ">
            <textarea
              className="commentTextArea "
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              name="text"
            />
            <button type="submit" className="commentEditButton authBtn">
              Update
            </button>
          </div>
          <div className="error">{touched && errors ? errors.text : null}</div>
        </form>
      )}
    </Formik>
  );
};

export default CommentEditForm;
