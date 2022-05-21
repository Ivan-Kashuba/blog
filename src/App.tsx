import "./App.scss";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import LoginContainer from "./pages/LoginPage/LoginContainer";
import Auth from "./pages/AuthPage/Auth";
import RegistrationContainer from "./pages/RegistrationPage/RegistrationContainer";
import SuccessRegistration from "./pages/SuccessRegistration/SuccessRegistration";
import Navigation from "./components/Navigation/Navigation";
import ProfileContainer from "./pages/ProfilePage/ProfileContainer";
import { connect, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { setAuth } from "./store/reducers/auth-reducer";
import UsersContainer from "./pages/UsersPage/UsersContainer";
import SettingsContainer from "./pages/SettingsPage/SettingsContainer";
import PostListContainer from "./pages/PostListPage/PostListContainer";
import PostDetailContainer from "./pages/PostDetailPage/PostDetailContainer";
import PostEditContainer from "./pages/PostEditPage/PostEditContainer";
import { AppStateType } from "./store/store";
import { compose } from "redux";

type props_T = {
  isAuth: boolean;
  setAuth: (status: boolean) => void;
};

const App = ({ isAuth, setAuth }: props_T) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAuth(false);
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
          <Route element={<PrivateAuth isAuth={isAuth} />}>
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="/profile">
              <Route path="" element={<ProfileContainer />} />
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
          </Route>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/registration" element={<RegistrationContainer />} />
          <Route path="reg-success" element={<SuccessRegistration />} />
          <Route path="/users" element={<UsersContainer />} />
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

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { setAuth })
)(App);
