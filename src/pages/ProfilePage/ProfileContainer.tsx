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
import { postsAPI, updateAccountPayload_T } from "../../api/api";
import { Post, User } from "../../types/models";
import { AppStateType } from "../../store/store";

type props_T = {
  currentUser: User;
  getCurrentUser: () => Promise<void>;
  getChoosenUser: (userId: string) => void;
  choosenUser: User;
  updateCurrentUser: (userId: string, userData: updateAccountPayload_T) => void;
  updateAvatar: (userId: string, avatar: FormData) => void;
  getAllPosts: (searchText?: string, userId?: string) => void;
  userPosts: Array<Post>;
};

const ProfileContainer = ({
  currentUser,
  getCurrentUser,
  getChoosenUser,
  choosenUser,
  updateCurrentUser,
  updateAvatar,
  getAllPosts,
  userPosts,
}: props_T) => {
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
      currentUser={userId ? choosenUser : currentUser}
      editMode={editMode}
      handleEditMode={handleEditMode}
      userId={userId as string}
      updateCurrentUser={updateCurrentUser}
      updateAvatar={updateAvatar}
      userPosts={userPosts}
      deletePost={deletePost}
      addPostMode={addPostMode}
      handleAddPostMode={handleAddPostMode}
    />
  );
};

const mapStateToProps = (state: AppStateType) => ({
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
