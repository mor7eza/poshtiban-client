import React from "react";
import { Link } from "react-router-dom";

const PasswordRecovery = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div id="login">
        <div id="login-container">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="Poshiban Logo" />
          <form>
            <div className="form-field">
              <label htmlFor="email">{global.tr.email}</label>
              <input type="text" id="email" placeholder={global.tr.email} />
            </div>

            <button className="btn" type="submit">
              {global.tr.send_password_to_email}
            </button>
            <Link to="/login" style={{ display: "block", textAlign: "center", marginTop: "2rem" }}>
              {global.tr.enter_account}
            </Link>
          </form>
        </div>
        <video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + "/assets/video/bg.mp4"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default PasswordRecovery;
