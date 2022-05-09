import React from "react";

const UserInfoItem = ({ user }) => {
  return (
    <div>
      {user.name ? (
        <div className="userInfoItem">
          <b>Name</b>: {user.name}
        </div>
      ) : null}
      {user.email ? (
        <div className="userInfoItem">
          <b>email</b>: {user.email}
        </div>
      ) : null}
      {user.profession ? (
        <div className="userInfoItem">
          <b>Profession</b>: {user.profession}
        </div>
      ) : null}
      {user.skills ? (
        <div className="userInfoItem">
          <b>Skills</b>: {user.skills}
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoItem;
