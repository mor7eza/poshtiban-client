import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { LOGIN } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  let history = useHistory();
  const [values, setValues] = useState({ email: "", password: "" });

  const [loginMutation] = useMutation(LOGIN, {
    onCompleted({ login }) {
      if (login.token) {
        context.login(login.token);
        history.push("/");
      }
    }
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginMutation({ variables: values });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div id="login">
        <div id="login-container">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="Poshiban Logo" />
          <form onSubmit={onSubmitHandler}>
            <div className="form-field">
              <label htmlFor="email">{global.tr.email}</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={global.tr.email}
                value={values.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">{global.tr.password}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={global.tr.password}
                value={values.password}
                onChange={onChangeHandler}
              />
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
