import { createReducer } from "@reduxjs/toolkit";
import { authAPI, usersAPI } from "../../api/api";
// Constants
const GET__CURRENT_USER_DATA = "GET__CURRENT_USER_DATA";
const SET__AUTH = "SET__AUTH";

const initialState = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  extra_details: null,
  skills: null,
  profession: null,
  details: null,
  dateCreated: null,
  isAuth: true,
};

// Reducer
const AuthReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET__CURRENT_USER_DATA, (state, action) => {
      return { ...state, ...action.payload };
    })
    .addCase(SET__AUTH, (state, action) => {
      return { ...state, isAuth: action.isAuth };
    });
});

// ActionCreator
export const setCurrentUser = (payload) => ({
  type: GET__CURRENT_USER_DATA,
  payload,
});

export const setAuth = (isAuth) => ({
  type: SET__AUTH,
  isAuth,
});

//Thunk
export const getCurrentUser = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data) {
    dispatch(setCurrentUser(response.data));
  }
};

export const updateCurrentUser = (id, updatedInfo) => async (dispatch) => {
  let response = await usersAPI.updateAccount(id, { ...updatedInfo });
  dispatch(setCurrentUser(response.data));
};

export const updateAvatar = (id, file) => async (dispatch) => {
  let response = await usersAPI.updateAvatar(id, file);
  dispatch(setCurrentUser(response.data));
};

export default AuthReducer;
