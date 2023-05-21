import axios from "axios";

import {
  ADD_PHOTO,
  UPDATE_PHOTO,
  DELETE_PHOTO,
  PHOTO_ERROR,
} from "../common/types";

const BASE_URL = "https://photo-gallery-ns4y.onrender.com"

export const addToGallery = (data) => async (dispatch) => {
  try {
    const response = await axios.post(BASE_URL + "/api/v1/upload", data, {
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

export const updateGallery = (data) => async (dispatch) => {
  try {
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    const response = await axios.post(BASE_URL + "/api/v1/update", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: UPDATE_PHOTO,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: null,
    });
  }
};

export const deleteFromGallery = (userId, imageId) => async (dispatch) => {
  try {
    console.log(userId, imageId);
    const response = await axios.delete(BASE_URL + "/api/v1/delete", {
      params: {
        userId: userId,
        imageId: imageId,
      },
    });
    dispatch({
      type: DELETE_PHOTO,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: null,
    });
  }
};
