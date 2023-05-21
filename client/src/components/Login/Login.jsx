import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../redux/actions/login";
import Error from "./Error";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <h1 className="loginHeading">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="registrationForm">
          {errorMessage ? <Error error={errorMessage} /> : null}
          <label className="registrationLabel" htmlFor="emailAddress">
            Email
          </label>
          <input
            id="emailAddress"
            className="loginInput"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <label className="registrationLabel" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <button className="registrationContinueButton" type="submit">
            <p>LOGIN</p>
          </button>
          <div className="noAccountDiv">
            <hr className="loginLine" />
            <p className="loginRegisterLine">Don't have an Account ?</p>
            <Link className="loginRegisterButton" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
