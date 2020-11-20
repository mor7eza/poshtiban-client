import React from "react";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar />
        <div className="dashboard"></div>
      </div>
    </div>
  );
};

export default Dashboard;
