import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { usersAPI } from "../../api/api";

const PostItemContainer = ({ post, deletePost, userId }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getPostUser = async () => {
      const response = await usersAPI.getChoosenUser(post.postedBy);
      setUser(response.data);
    };
    if (post.postedBy) {
      getPostUser();
    }
  }, []);

  return (
    <PostItem
      post={post}
      deletePost={deletePost}
      userId={userId}
      currentUser={user}
    />
  );
};

export default PostItemContainer;
