import React from "react";
import logo from "./../../img/logo.png";
import { NavLink } from "react-router-dom";

const Auth = () => {
  return (
    <div className="authContainer">
      <div className="authContent">
        <img src={logo} alt="Ficus" className="authLogo" />
        <h3 className="authMainText">Sign In to Ficus Blog</h3>
        <NavLink to="/login" className="authLink">
          <div className="authBtn authIn">Sign In</div>
        </NavLink>
        <NavLink to="/registration" className="authLink">
          <div className="authBtn authUp">Sign Up</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Auth;
