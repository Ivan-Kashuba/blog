import React, { useState } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { createPost } from "../../store/reducers/posts-reducer";

const PostsContainer = ({ createPost }) => {
  const [error, setError] = useState();

  const createPostHandler = (postInfo) => {
    createPost(postInfo).catch((e) => {
      setError(
        e.response.data.error[0].message
          ? e.response.data.error[0].message
          : e.response.data.error
      );
    });
  };
  return (
    <div>
      <PostForm
        createPostHandler={createPostHandler}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default connect(null, { createPost })(PostsContainer);
