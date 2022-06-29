import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  ADD_PHOTO,
  UPDATE_PHOTO,
  DELETE_PHOTO,
  PHOTO_ERROR,
} from "../common/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("id", payload.user.id);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user.gallery,
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      // localStorage.removeItem("token");
      // localStorage.removeItem("id");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED:
      // localStorage.setItem("token",token);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
        user: payload.gallery,
      };
    case ADD_PHOTO:
      return {
        ...state,
        user: payload.gallery,
      };
    default:
      return state;
  }
};

export default auth;
