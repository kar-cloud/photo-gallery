import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../common/types";

export const register = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    const response = await axios.post("/api/v1/auth/register", {
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

export const loadUser = (token, userId) => async (dispatch) => {
  try {
    if (token) {
      const response = await axios.get("/api/v1/user", {
        params: {
          token: token,
          userId: userId,
        },
      });
      dispatch({
        type: USER_LOADED,
        payload: {
          token: token,
          data: response.data,
        },
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
