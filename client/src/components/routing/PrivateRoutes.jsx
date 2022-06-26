import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;
  //   const {isAuthenticated} = cookie checkRequired;
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          !isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          );
        }}
      />
    </div>
  );
};

export default PrivateRoute;
