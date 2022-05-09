import { Formik } from "formik";
import React from "react";
import InputItem from "./../../components/InputItem/InputItem";
import TextAreaItem from "./../../components/textAreaItem/textAreaItem";
import { postCreatorValidator } from "./../../validators/validators";
import defaultPostImage from "./../../img/defaultPostImage.jpg";

const PostEdit = ({ post, updatePost, onPostPhotoChange }) => {
  return (
    <>
      <Formik
        initialValues={{
          title: post.title || "",
          fullText: post.fullText || "",
          description: post.description || "",
        }}
        validate={(values) => postCreatorValidator(values)}
        onSubmit={(values) => {
          updatePost(values);
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
          <form onSubmit={handleSubmit} className="loginContent">
            <div className="postDetailsContainer">
              <h1 className="postDetailsMainText">
                Title:
                <InputItem
                  error={errors.title}
                  touched={touched.title}
                  name="title"
                  type="text"
                  value={values.title}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Title"
                />
              </h1>
              <div className="postDetailsMainContent">
                <div>
                  <img
                    className="postImage"
                    src={
                      post.image
                        ? `http://test-blog-api.ficuslife.com${post.image}`
                        : defaultPostImage
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    onChange={(event) => onPostPhotoChange(event)}
                  />
                </div>
                <div className="postDetailsContent">
                  <strong>Short description about this post: </strong>

                  <TextAreaItem
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
                    <strong>Full text:</strong>
                    <TextAreaItem
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
                  </div>
                  <div className="editPostDetailsInfo ">
                    <div>Liked:{post.likes.length}</div>
                    <div>Created: {post.dateCreated}</div>
                  </div>
                  <div className="editSaveBtnContainer">
                    <button type="submit" className="authBtn editSaveBtn">
                      Save edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PostEdit;
