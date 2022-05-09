import "./App.scss";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import LoginContainer from "./pages/LoginPage/LoginContainer";
import Auth from "./pages/AuthPage/Auth";
import RegistrationContainer from "./pages/RegistrationPage/RegistrationContainer";
import SuccessRegistration from "./pages/SuccessRegistration/SuccessRegistration";
import Navigation from "./components/Navigation/Navigation";
import ProfileContainer from "./pages/ProfilePage/ProfileContainer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./store/reducers/auth-reducer";
import UsersContainer from "./pages/UsersPage/UsersContainer";
import SettingsContainer from "./pages/SettingsPage/SettingsContainer";
import PostListContainer from "./pages/PostListPage/PostListContainer";
import PostDetailContainer from "./pages/PostDetailPage/PostDetailContainer";
import PostEditContainer from "./pages/PostEditPage/PostEditContainer";

const App = ({ isAuth, setAuth }) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAuth(false);
    }
  }, [isAuth]);

  const PrivateAuth = ({ isAuth }) => {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setAuth })(App);
