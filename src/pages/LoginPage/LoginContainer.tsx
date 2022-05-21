import Login from "./Login";
import { setAuth } from "../../store/reducers/auth-reducer";
import { authAPI, loginParams_T } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

type props_T = {
  setAuth: (status: boolean) => void;
};
export const LoginContainer = ({ setAuth }: props_T) => {
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const login = async (loginObject: loginParams_T) => {
    const response = await authAPI.login(loginObject).catch((err) => {
      setError(err.response.data.error);
    });

    localStorage.setItem("token", `Bearer ${response?.data.token}`);
    setAuth(true);
    navigation("/profile");
  };

  return <Login login={login} error={error} />;
};

export default connect(null, { setAuth })(LoginContainer);
