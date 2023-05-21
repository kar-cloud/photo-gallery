import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  let isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
     isAuthenticated ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
