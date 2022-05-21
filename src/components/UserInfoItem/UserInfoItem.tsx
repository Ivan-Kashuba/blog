import React from "react";
import { User } from "../../types/models";

type props_T = {
  user: User;
};

const UserInfoItem = ({ user }: props_T) => {
  return (
    <div>
      {user.name ? (
        <div className="userInfoItem">
          <strong>Name</strong>: {user.name}
        </div>
      ) : null}
      {user.email ? (
        <div className="userInfoItem">
          <strong>email</strong>: {user.email}
        </div>
      ) : null}
      {user.profession ? (
        <div className="userInfoItem">
          <strong>Profession</strong>: {user.profession}
        </div>
      ) : null}
      {user.skills ? (
        <div className="userInfoItem">
          <strong>Skills</strong>: {user.skills}
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoItem;
