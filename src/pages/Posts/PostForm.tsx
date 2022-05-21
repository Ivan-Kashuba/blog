import { Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { postCreatorValidator } from "../../validators/validators";
import TextAreaItem from "../../components/textAreaItem/textAreaItem";
import { setPostsPayload_T } from "../../types/reducers";

type props_T = {
  createPostHandler: (postInfo: setPostsPayload_T) => void;
  error?: string;
  setError: Dispatch<SetStateAction<string>>;
};

const PostForm = ({ createPostHandler, error, setError }: props_T) => {
  const initialValues = {
    title: "",
    fullText: "",
    description: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => postCreatorValidator(values)}
      onSubmit={(values, { resetForm }) => {
        setError("");
        createPostHandler(values);
        resetForm({ values: initialValues });
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="error">{error ? error : null}</div>

          <TextAreaItem
            label="Title"
            name="title"
            value={values.title}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Title"
            rows={3}
            cols={30}
            touched={touched.title}
            error={errors.title}
          />

          <TextAreaItem
            label="Full Text"
            name="fullText"
            value={values.fullText}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Full Text"
            rows={7}
            cols={30}
            touched={touched.fullText}
            error={errors.fullText}
          />

          <TextAreaItem
            label="Description"
            name="description"
            value={values.description}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Description"
            rows={5}
            cols={30}
            touched={touched.description}
            error={errors.description}
          />

          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PostForm;
