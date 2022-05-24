import Login from "./Login";
import { setAuth } from "../../store/reducers/auth-reducer";
import { authAPI, loginParams_T } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const login = async (loginObject: loginParams_T) => {
    const response = await authAPI.login(loginObject).catch((err) => {
      setError(err.response.data.error);
    });

    localStorage.setItem("token", `Bearer ${response?.data.token}`);
    dispatch(setAuth(true));
    navigation("/profile");
  };

  return <Login login={login} error={error} />;
};
