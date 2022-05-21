import React from "react";

type props_T = {
  _id: string;
  deleteUser: (userId: string) => void;
  message: string;
};

const Settings = ({ _id, deleteUser, message }: props_T) => {
  return (
    <div className="settingsContainer">
      To delete current account press button:
      <div className="settingsDelete">
        <button onClick={() => deleteUser(_id)} className="authBtn deleteBtn">
          Delete
        </button>
        <div className="error">{message ? message : null}</div>
      </div>
    </div>
  );
};

export default Settings;
