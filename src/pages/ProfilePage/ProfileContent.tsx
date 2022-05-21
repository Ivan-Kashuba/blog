import React from "react";
import { User } from "../../types/models";
type props_T = {
  currentUser: User;
};

const ProfileContent = ({ currentUser }: props_T) => {
  return (
    <>
      <h1>{currentUser.name}</h1>
      <div className="profileContentItem">
        <b>Profession:</b> {currentUser.profession}
      </div>
      <div className="profileContentItem">
        <b>Skills:</b> {currentUser.skills}
      </div>
      <div className="profileContentItem">
        <b>Email:</b> {currentUser.email}
      </div>
      <div className="profileContentItem">
        <b>About:</b> {currentUser.details}
      </div>
      <div className="profileContentItem">
        <b>About tech stack:</b> {currentUser.extra_details}
      </div>
      <div className="profileContentItem">
        <b>On site from:</b> {currentUser.dateCreated?.slice(0, 10)}
      </div>
    </>
  );
};

export default ProfileContent;
