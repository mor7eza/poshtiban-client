import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

const Register = () => {
  const context = useContext(AuthContext);
  let history = useHistory();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [registerMutation] = useMutation(REGISTER, {
    onCompleted({ register }) {
      if (register.token) {
        context.login(register.token);
        history.push("/");
      }
    }
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerMutation({ variables: values });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div id="login">
        <div id="login-container">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="Poshiban Logo" />
          <form onSubmit={onSubmitHandler}>
            <div className="form-field">
              <label htmlFor="name">{global.tr.name}</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder={global.tr.name}
                onChange={onChangeHandler}
                value={values.first_name}
                style={{ fontFamily: "IRANYekan" }}
              />
            </div>
            <div className="form-field">
              <label htmlFor="last_name">{global.tr.last_name}</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder={global.tr.last_name}
                onChange={onChangeHandler}
                value={values.last_name}
                style={{ fontFamily: "IRANYekan" }}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">{global.tr.email}</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={global.tr.email}
                onChange={onChangeHandler}
                value={values.email}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">{global.tr.password}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={global.tr.password}
                onChange={onChangeHandler}
                value={values.password}
              />
            </div>
            <div className="form-field">
              <label htmlFor="confirm_password">{global.tr.confirm_password}</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder={global.tr.confirm_password}
                onChange={onChangeHandler}
                value={values.confirm_password}
              />
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
