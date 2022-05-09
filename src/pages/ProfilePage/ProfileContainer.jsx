import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCurrentUser,
  updateCurrentUser,
  updateAvatar,
} from "../../store/reducers/auth-reducer";
import React from "react";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import { getChoosenUser } from "../../store/reducers/users-reducer";
import { getAllPosts } from "../../store/reducers/posts-reducer";
import { postsAPI } from "../../api/api";

const ProfileContainer = ({
  currentUser,
  getCurrentUser,
  getChoosenUser,
  choosenUser,
  updateCurrentUser,
  updateAvatar,
  getAllPosts,
  userPosts,
}) => {
  const { userId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [addPostMode, setAddPostMode] = useState(false);
  const handleAddPostMode = (status) => {
    setAddPostMode(status);
  };
  const handleEditMode = (status) => {
    setEditMode(status);
  };

  const deletePost = async (id) => {
    await postsAPI.deletePost(id);
    getAllPosts("", currentUser._id);
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
      currentUser={userId ? choosenUser : currentUser}
      editMode={editMode}
      handleEditMode={handleEditMode}
      userId={userId}
      updateCurrentUser={updateCurrentUser}
      updateAvatar={updateAvatar}
      userPosts={userPosts}
      deletePost={deletePost}
      addPostMode={addPostMode}
      handleAddPostMode={handleAddPostMode}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  choosenUser: state.users.userInfo,
  userPosts: state.posts.postsArr,
});

export default connect(mapStateToProps, {
  getCurrentUser,
  getChoosenUser,
  updateCurrentUser,
  updateAvatar,
  getAllPosts,
})(ProfileContainer);
