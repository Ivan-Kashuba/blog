import React, { useEffect, useState } from "react";
import { usersAPI } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import { setAuth } from "../../store/reducers/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { currentUserId, getCurrentUser } = useAuth();

  const [message, setMessage] = useState("");
  useEffect(() => {
    getCurrentUser();
  }, [currentUserId]);

  const deleteUser = async () => {
    let response = await usersAPI.deleteAccount(currentUserId);
    setMessage(response.data.message);
    localStorage.removeItem("token");
    dispatch(setAuth(false));
  };

  return (
    <div className="settingsContainer">
      To delete current account press button:
      <div className="settingsDelete">
        <button onClick={() => deleteUser()} className="authBtn deleteBtn">
          Delete
        </button>
        <div className="error">{message ? message : null}</div>
      </div>
    </div>
  );
};
