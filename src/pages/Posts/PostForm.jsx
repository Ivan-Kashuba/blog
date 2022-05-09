import { Formik } from "formik";
import React from "react";
import { postCreatorValidator } from "./../../validators/validators";
import TextAreaItem from "./../../components/textAreaItem/textAreaItem";

const PostForm = ({ createPostHandler, error, setError }) => {
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
        resetForm(initialValues);
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
