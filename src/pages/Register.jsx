import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div id="login">
        <div id="login-container">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="Poshiban Logo" />
          <form>
            <div className="form-field">
              <label htmlFor="name">{global.tr.name}</label>
              <input type="text" id="name" placeholder={global.tr.name} style={{ fontFamily: "IRANYekan" }} />
            </div>
            <div className="form-field">
              <label htmlFor="last_name">{global.tr.last_name}</label>
              <input type="text" id="last_name" placeholder={global.tr.last_name} style={{ fontFamily: "IRANYekan" }} />
            </div>
            <div className="form-field">
              <label htmlFor="email">{global.tr.email}</label>
              <input type="text" id="email" placeholder={global.tr.email} />
            </div>
            <div className="form-field">
              <label htmlFor="password">{global.tr.password}</label>
              <input type="password" id="password" placeholder={global.tr.password} />
            </div>
            <div className="form-field">
              <label htmlFor="confirm_password">{global.tr.confirm_password}</label>
              <input type="password" placeholder={global.tr.confirm_password} />
            </div>
            <button type="submit">{global.tr.submit}</button>
            <Link to="/login" style={{ display: "block", textAlign: "center", marginTop: "2rem" }} href="#">
              {global.tr.already_member}
            </Link>
          </form>
        </div>
        <video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + "/assets/video/bg.mp4"} type="video/mp4" />
        </video>
      </div>
      <Helmet>
        <script>var vid=document.querySelector("video");vid.playbackRate=0.5;</script>
      </Helmet>
    </div>
  );
};

export default Register;
