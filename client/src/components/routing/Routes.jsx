import React from "react";
import { Switch } from "react-router-dom";
import FileUpload from "../FileUpload";
import PrivateRoute from "./PrivateRoutes";

const Routes = () => {
  return (
    <div>
      <Switch>
        {/* <PrivateRoute path="/home" component={FileUpload} /> */}
      </Switch>
    </div>
  );
};

export default Routes;
