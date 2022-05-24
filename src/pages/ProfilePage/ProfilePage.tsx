import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import { postsAPI } from "../../api/api";
import { usePosts } from "../../hooks/usePosts";
import { useAuth } from "../../hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

export const ProfilePage = () => {
  const { currentUser, getCurrentUser } = useAuth();
  const { chosenUser, getChoosenUser } = useUsers();
  const { getAllPosts, postsArr } = usePosts();

  const { userId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [addPostMode, setAddPostMode] = useState(false);
  const handleAddPostMode = (status: boolean) => {
    setAddPostMode(status);
  };

  const handleEditMode = (status: boolean) => {
    setEditMode(status);
  };

  const deletePost = async (id: string) => {
    await postsAPI.deletePost(id);
    getAllPosts("", currentUser._id as string);
  };

  useEffect(() => {
    if (userId) {
      getChoosenUser(userId);
      getAllPosts("", userId);
    } else {
      getCurrentUser().then(() => {
        getAllPosts("", currentUser._id ? currentUser._id : "");
      });
    }
  }, [userId, currentUser._id]);

  return (
    <Profile
      currentUser={userId ? chosenUser : currentUser}
      editMode={editMode}
      handleEditMode={handleEditMode}
      userId={userId as string}
      userPosts={postsArr}
      deletePost={deletePost}
      addPostMode={addPostMode}
      handleAddPostMode={handleAddPostMode}
    />
  );
};
