import Login from "./Login";
import { setAuth } from "./../../store/reducers/auth-reducer";
import { authAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

export const LoginContainer = ({ setAuth }) => {
  const [error, setError] = useState();
  const navigation = useNavigate();

  const login = async (loginObject) => {
    let response = await authAPI.login(loginObject).catch((err) => {
      setError(err.response.data.error);
    });
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    setAuth(true);
    navigation("/profile");
  };

  return <Login login={login} error={error} />;
};

export default connect(null, { setAuth })(LoginContainer);
