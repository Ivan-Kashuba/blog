import React from "react";
import { NavLink } from "react-router-dom";
import profile from "./../../img/profile.png";
import news from "./../../img/news.png";
import setting from "./../../img/setting.png";
import users from "./../../img/user.png";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navLink">
        <NavLink
          to="/profile"
          className={(data) => (data.isActive ? "activeItem" : "navItem")}
        >
          <div>Profile</div>
          <img className="navIconItem" src={profile} alt="" />
        </NavLink>
      </div>

      <div className="navLink">
        <NavLink
          to="/users"
          className={(data) => (data.isActive ? "activeItem" : "navItem")}
        >
          Users
          <img className="navIconItem" src={users} alt="" />
        </NavLink>
      </div>

      <div className="navLink">
        <NavLink
          to="/posts"
          className={(data) => (data.isActive ? "activeItem" : "navItem")}
        >
          Posts
          <img className="navIconItem" src={news} alt="" />
        </NavLink>
      </div>

      <div className="navLink">
        <NavLink
          to="/settings"
          className={(data) => (data.isActive ? "activeItem" : "navItem")}
        >
          Settings
          <img className="navIconItem" src={setting} alt="" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
