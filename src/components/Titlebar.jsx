import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

const Titlebar = ({ title }) => {
  const context = useContext(AuthContext);
  return (
    <div className="titlebar">
      <h2>{title}</h2>
      <span style={{ flexGrow: "1" }}></span>
      <p>{`${global.tr.welcome}، ${context.first_name} ${context.last_name}`}</p>
      <div className="avatar">
        {/* <span>{context.first_name.charAt(0)}</span> */}
        <img src={`https://avatars.dicebear.com/api/jdenticon/${context.id}.svg`} alt="avatar" />
      </div>
    </div>
  );
};

export default Titlebar;
