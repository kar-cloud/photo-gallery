import axios from "axios";
import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Error from "./Error";

const Register = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  // if (auth) {
  //   return <Redirect to="/home" />;
  // }

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/v1/auth", {
      email: email,
      password: password,
    });
    if (response.data.status == true) {
      setErrorMessage(response.data.success);
      return <Redirect to="/home" />;
    } else {
      setErrorMessage(response.data.error);
    }
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
