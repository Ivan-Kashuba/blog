import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";
import { getCurrentUser } from "../../store/reducers/auth-reducer";
import Settings from "./Settings";
import { setAuth } from "../../store/reducers/auth-reducer";
import { AppStateType } from "../../store/store";

type props_T = {
  _id: string;
  getCurrentUser: () => Promise<void>;
  setAuth: (status: boolean) => void;
};

const SettingsContainer = ({ _id, getCurrentUser, setAuth }: props_T) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    getCurrentUser();
  }, [_id]);

  const deleteUser = async (id: string) => {
    let response = await usersAPI.deleteAccount(id);
    setMessage(response.data.message);
    localStorage.removeItem("token");
    setAuth(false);
  };

  return <Settings _id={_id} deleteUser={deleteUser} message={message} />;
};
const mapStateToProps = (state: AppStateType) => ({
  _id: state.auth._id,
});
export default connect(mapStateToProps, { getCurrentUser, setAuth })(
  SettingsContainer
);
