import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../common/types";

const initialState = {
  //   token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      //   localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      //  localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    default:
      return state;
  }
};

export default auth;
