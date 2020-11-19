import React from "react";

const Login = () => {
  return (
    <div>
      <div id="login-bg">
        <video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + "/assets/video/bg.mp4"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Login;
