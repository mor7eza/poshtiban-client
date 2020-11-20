import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo-image.svg"} alt="Poshtiban Logo" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-dashboard.svg"} alt="dashboard" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-tickets.svg"} alt="dashboard" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-settings.svg"} alt="dashboard" />
        </Link>
      </div>
      <span style={{ flexGrow: "1" }}></span>
      <div className="sidebar-item">
        <Link to="">
          <img src={process.env.PUBLIC_URL + "/assets/img/sidebar-logout.svg"} alt="dashboard" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
