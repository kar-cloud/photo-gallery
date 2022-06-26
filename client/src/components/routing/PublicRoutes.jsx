import React from "react";
import Login from "../Login/Login";
import { Route, Switch } from "react-router-dom";
import StartPage from "../StartPage";
import Register from "../Login/Register";
import FileUpload from "../FileUpload";

const PublicRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={FileUpload} />
      </Switch>
    </div>
  );
};

export default PublicRoutes;
