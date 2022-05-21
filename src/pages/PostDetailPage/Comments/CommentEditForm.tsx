import { Formik } from "formik";
import React from "react";
import { commentCreatorValidator } from "../../../validators/validators";
import { Comment } from "../../../types/models";

type props_T = {
  comment: Comment;
  updateCommentHandler: (commentId: string, text: string) => void;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};
const CommentEditForm = ({
  comment,
  updateCommentHandler,
  setIsEdit,
}: props_T) => {
  return (
    <Formik
      initialValues={{ text: comment.text || "" }}
      validate={(values) => commentCreatorValidator(values)}
      onSubmit={(values, { resetForm }) => {
        updateCommentHandler(comment._id!, values.text);
        setIsEdit!(false);
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
