import React from "react";
import UserInfoItem from "../../components/UserInfoItem/UserInfoItem";
import { NavLink } from "react-router-dom";
import defaultAvatar from "./../../img/defaultAvatar.png";

const UserItem = ({ user }) => {
  return (
    <div className="userItem">
      <NavLink to={"/profile/" + user._id}>
        <img
          src={
            user.avatar
              ? `http://test-blog-api.ficuslife.com${user.avatar}`
              : defaultAvatar
          }
          alt="Avatar"
          className="userItemImg"
        />
      </NavLink>
      <div className="userItemContent">
        <UserInfoItem user={user} />
      </div>
    </div>
  );
};

export default UserItem;
