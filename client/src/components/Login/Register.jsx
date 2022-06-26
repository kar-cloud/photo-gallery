import axios from "axios";
import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Error from "./Error";
import { register } from "../../redux/actions/login";

const Register = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(register(email, password));
  };

  return (
    <div>
      <h1 className="loginHeading">Sign Up</h1>
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
            <p>REGISTER</p>
          </button>
          <div className="noAccountDiv">
            <hr className="loginLine" />
            <p className="loginRegisterLine">Already have an Account ?</p>
            <Link className="loginRegisterButton" to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
