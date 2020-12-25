import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Titlebar = ({ title }) => {
  const context = useContext(AuthContext);
  const history = useHistory();
  if (localStorage.getItem("jwtToken") && context.id === "") {
    const token = localStorage.getItem("jwtToken");
    const { exp } = jwtDecode(token);
    if (Date.now() < exp * 1000) {
      context.login(token);
      window.location.reload();
    } else {
      history.push("/login");
    }
  }
  if (!localStorage.getItem("jwtToken")) history.push("/login");
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
