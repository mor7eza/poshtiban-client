import React from "react";

const Titlebar = ({ title }) => {
  return (
    <div className="titlebar">
      <h2>{title}</h2>
      <span style={{ flexGrow: "1" }}></span>
      <p>{`${global.tr.welcome}، مرتضی علی یاری`}</p>
      <div className="avatar">
        <span>م</span>
      </div>
    </div>
  );
};

export default Titlebar;
