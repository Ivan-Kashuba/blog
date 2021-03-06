import { Formik } from "formik";
import React from "react";
import { commentCreatorValidator } from "../../../validators/validators";

type props_T = {
  addComment: (text: string, commentId: string) => void;
  commentId: string;
  setCommentMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReplyCommentForm = ({
  addComment,
  commentId,
  setCommentMode,
}: props_T) => {
  return (
    <div className="editMessageForm">
      <Formik
        initialValues={{ text: "" }}
        validate={(values) => commentCreatorValidator(values)}
        onSubmit={(values, { resetForm }) => {
          addComment(values.text, commentId);
          resetForm({ values: { text: "" } });
          setCommentMode(false);
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
              <button type="submit" className="editMessageFormButton ">
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
  );
};

export default ReplyCommentForm;
