import axios from "axios";

import {
  ADD_PHOTO,
  UPDATE_PHOTO,
  DELETE_PHOTO,
  PHOTO_ERROR,
} from "../common/types";

export const addToGallery = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/v1/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({
      type: ADD_PHOTO,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PHOTO_ERROR,
      payload: null,
    });
  }
};
