import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { createPost } from "../../store/reducers/posts-reducer";
import { setPostsPayload_T } from "../../types/reducers";

type props_T = {
  createPost: (postInfo: setPostsPayload_T) => Promise<void>;
};

const PostsContainer = ({ createPost }: props_T) => {
  const [error, setError] = useState("");

  const createPostHandler = (postInfo: setPostsPayload_T) => {
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
