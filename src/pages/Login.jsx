import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
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
            <div className="form-field">
              <label htmlFor="password">{global.tr.password}</label>
              <input type="password" id="password" placeholder={global.tr.password} />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">{global.tr.remember_me}</label>
              <Link to="/password-recovery">{global.tr.forget_password}</Link>
            </div>
            <button className="btn" type="submit">
              {global.tr.submit}
            </button>
            <p>{global.tr.or}</p>
            <Link to="/register" className="btn register-btn">
              {global.tr.register}
            </Link>
          </form>
        </div>
        <video autoPlay muted loop id="bg-video">
          <source src={process.env.PUBLIC_URL + "/assets/video/bg.mp4"} type="video/mp4" />
        </video>
      </div>
      <Helmet>
        <script>var vid=document.querySelector("video");vid.playbackRate=0.5;</script>
      </Helmet>
    </div>
  );
};

export default Login;
