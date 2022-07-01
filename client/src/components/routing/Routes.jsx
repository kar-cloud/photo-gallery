import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Home";
import Capture from "../Capture";

const Routes = () => {
  return (
    <div id="wrapper">
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/takePicture" component={Capture} />
      </Switch>
    </div>
  );
};

export default Routes;
