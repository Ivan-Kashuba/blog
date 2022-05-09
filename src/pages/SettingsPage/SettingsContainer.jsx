import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";
import { getCurrentUser } from "../../store/reducers/auth-reducer";
import Settings from "./Settings";
import { setAuth } from "../../store/reducers/auth-reducer";

const SettingsContainer = ({ _id, getCurrentUser, setAuth }) => {
  const [message, setMessage] = useState();
  useEffect(() => {
    getCurrentUser();
  }, [_id]);

  const deleteUser = async (id) => {
    let response = await usersAPI.deleteAccount(id);
    setMessage(response.data.message);
    localStorage.removeItem("token");
    setAuth(false);
  };

  return <Settings _id={_id} deleteUser={deleteUser} message={message} />;
};
const mapStateToProps = (state) => ({
  _id: state.auth._id,
});
export default connect(mapStateToProps, { getCurrentUser, setAuth })(
  SettingsContainer
);
