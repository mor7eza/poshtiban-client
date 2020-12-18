import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import Register from "./pages/Register";
import Users from "./pages/Users";
import User from "./pages/User";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import Ticket from "./pages/Ticket";
import NotFound404 from "./pages/NotFound404";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/password-recovery" component={PasswordRecovery} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={User} />
        <Route exact path="/tickets" component={Tickets} />
        <Route exact path="/tickets/new" component={NewTicket} />
        <Route exact path="/tickets/ticket/:id" component={Ticket} />
        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
