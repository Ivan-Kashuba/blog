import React from "react";
import PostItem from "../PostItem/PostItem";
import { PostsContainer } from "../Posts/PostsContainer";
import Preloader from "../../components/Preloader/Preloader";
import ProfileContent from "./ProfileContent";
import ProfileForm from "./ProfileForm";
import defaultAvatar from "./../../img/defaultAvatar.png";
import { Post, User } from "../../types/models";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateAvatar } from "../../store/reducers/auth-reducer";

type props_T = {
  currentUser: User;
  editMode: boolean;
  handleEditMode: (status: boolean) => void;
  userId: string;
  userPosts: Array<Post>;
  deletePost: (postId: string) => void;
  addPostMode: boolean;
  handleAddPostMode: (status: boolean) => void;
};

const Profile = ({
  currentUser,
  editMode,
  handleEditMode,
  userId,
  userPosts,
  deletePost,
  addPostMode,
  handleAddPostMode,
}: props_T) => {
  const dispatch = useAppDispatch();

  const formData = new FormData();
  const onMainPhotoSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      formData.append("avatar", event.target.files[0]);
      dispatch(updateAvatar(currentUser._id as string, formData));
    }
  };

  if (!currentUser._id) {
    return <Preloader />;
  }

  return (
    <div className="profileContainer">
      <div className="profileMainContent">
        <div>
          <img
            src={
              currentUser.avatar
                ? `http://test-blog-api.ficuslife.com${currentUser.avatar}`
                : defaultAvatar
            }
            alt="IconPhoto"
            className="profileUserIcon"
          />

          {!userId && (
            <div className="profileChangeAvatar">
              <input
                type="file"
                onChange={(event) => onMainPhotoSelected(event)}
              />
            </div>
          )}
        </div>
        <div className="profileContent">
          {editMode ? (
            <ProfileForm
              currentUser={currentUser}
              handleEditMode={handleEditMode}
            />
          ) : (
            <div>
              <ProfileContent currentUser={currentUser} />
              {!userId ? (
                <button onClick={() => handleEditMode(true)}>Edit</button>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className="postsContainer">
        <h2>{currentUser.name} posts:</h2>
        {!userId ? (
          addPostMode ? (
            <button
              onClick={() => {
                handleAddPostMode(false);
              }}
            >
              Hide
            </button>
          ) : (
            <button
              onClick={() => {
                handleAddPostMode(true);
              }}
            >
              Create Post
            </button>
          )
        ) : null}
        {addPostMode && <PostsContainer />}
        {userPosts.map((post) => {
          return (
            <PostItem
              post={post}
              key={post._id}
              deletePost={deletePost}
              userId={userId}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
