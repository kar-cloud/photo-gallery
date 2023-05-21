import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../common/types";

const BASE_URL = "https://photo-gallery-ns4y.onrender.com"

export const register = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(BASE_URL + "/api/v1/auth/register", {
      email: email,
      password: password,
    });
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
    const response = await axios.post(BASE_URL + "/api/v1/auth/login", {
      email: email,
      password: password,
    });
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
    console.log({ token, userId });
    if (token) {
      const response = await axios.get(BASE_URL + "/api/v1/user", {
        params: {
          token: token,
          userId: userId,
        },
      });
      console.log(response);
      dispatch({
        type: USER_LOADED,
        payload: response.data,
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

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
};
