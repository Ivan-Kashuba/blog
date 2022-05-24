import React, { useState } from "react";
import PostForm from "./PostForm";
import { createPost } from "../../store/reducers/posts-reducer";
import { setPostsPayload_T } from "../../types/reducers";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const PostsContainer = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const createPostHandler = (postInfo: setPostsPayload_T) => {
    dispatch(createPost(postInfo)).catch((e) => {
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
