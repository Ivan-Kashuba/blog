import "./App.scss";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { LoginContainer } from "./pages/LoginPage/LoginContainer";
import Auth from "./pages/AuthPage/Auth";
import { RegistrationContainer } from "./pages/RegistrationPage/RegistrationContainer";
import SuccessRegistration from "./pages/SuccessRegistration/SuccessRegistration";
import Navigation from "./components/Navigation/Navigation";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { setAuth } from "./store/reducers/auth-reducer";
import { PostListContainer } from "./pages/PostListPage/PostListContainer";
import { PostDetailContainer } from "./pages/PostDetailPage/PostDetailContainer";
import { PostEditContainer } from "./pages/PostEditPage/PostEditContainer";
import { getIsAuth_S } from "./selectors/auth-selector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { Users } from "./pages/UsersPage/Users";
import { Settings } from "./pages/SettingsPage/Settings";

export const App = () => {
  const isAuth = useSelector(getIsAuth_S);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(setAuth(false));
    }
  }, [isAuth]);

  type privateProps_T = {
    isAuth: boolean;
  };

  const PrivateAuth = ({ isAuth }: privateProps_T) => {
    const location = useLocation();
    return isAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return (
    <div className="app__wrapper">
      <div className="app__navbar">
        <Navigation />
      </div>
      <div className="app__wrapper__content">
        <Routes>
          <Route element={<PrivateAuth isAuth={isAuth as boolean} />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile">
              <Route path="" element={<ProfilePage />} />
              <Route path=":userId" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/registration" element={<RegistrationContainer />} />
          <Route path="reg-success" element={<SuccessRegistration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts">
            <Route path="" element={<PostListContainer />} />
            <Route path=":postId" element={<PostDetailContainer />} />
            <Route path="edit/:postId" element={<PostEditContainer />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
