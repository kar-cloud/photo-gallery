import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../common/types";

export const login = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    const response = await axios.post("/api/v1/auth/login", {
      email: email,
      password: password,
    });
    console.log(response);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = (token) => async (dispatch) => {
  try {
    if (token) {
      dispatch({
        type: USER_LOADED,
        payload: null,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  }
};
