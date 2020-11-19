import React from "react";

const Login = () => {
  return (
    <>
      <div id="login">
        <div id="login-container">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="Poshiban Logo" />
          <form>
            <div className="form-field">
              <label htmlFor="email">{global.tr.email}</label>
              <input type="text" id="email" placeholder={global.tr.email} />
            </div>
            <div className="form-field">
              <label htmlFor="">{global.tr.password}</label>
              <input type="password" placeholder={global.tr.password} />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">{global.tr.remember_me}</label>
              <a href="#">{global.tr.forget_password}</a>
            </div>
            <button type="submit">{global.tr.submit}</button>
            <p>{global.tr.or}</p>
            <button>{global.tr.register}</button>
          </form>
        </div>
        <video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + "/assets/video/bg.mp4"} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Login;
