import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";
import StartPage from "../StartPage";

const PublicRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default PublicRoutes;
