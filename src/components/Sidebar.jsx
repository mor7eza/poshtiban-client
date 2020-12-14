import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const Sidebar = () => {
  const context = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo-image.svg"} alt="Poshtiban Logo" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-dashboard.svg"} alt="dashboard" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/tickets">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-tickets.svg"} alt="tickets" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/users">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-users.svg"} alt="users" />
        </Link>
      </div>
      <span style={{ flexGrow: "1" }}></span>
      <div className="sidebar-item">
        <Link to="/login" onClick={(e) => context.logout()}>
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-logout.svg"} alt="logout" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
