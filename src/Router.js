import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import Register from "./pages/Register";
import Users from "./pages/Users";
import User from "./pages/User";

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/password-recovery" component={PasswordRecovery} />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:id" component={User} />
    </BrowserRouter>
  );
};

export default Router;
