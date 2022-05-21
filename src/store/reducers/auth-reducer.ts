import { createReducer, Dispatch } from "@reduxjs/toolkit";
import { authAPI, updateAccountPayload_T, usersAPI } from "../../api/api";
import { authInitialState_T } from "../../types/reducers";
import { User } from "../../types/models";

// Constants
const GET__CURRENT_USER_DATA = "GET__CURRENT_USER_DATA";
const SET__AUTH = "SET__AUTH";

const initialState: authInitialState_T = {
  _id: "",
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
    .addCase(
      GET__CURRENT_USER_DATA,
      (state, action: setCurrentUser_T): authInitialState_T => {
        return { ...state, ...action.payload };
      }
    )
    .addCase(SET__AUTH, (state, action: setAuth_T): authInitialState_T => {
      return { ...state, isAuth: action.isAuth };
    });
});

// ActionCreator
type setCurrentUser_T = {
  type: typeof GET__CURRENT_USER_DATA;
  payload: User;
};

export const setCurrentUser = (payload: User): setCurrentUser_T => ({
  type: GET__CURRENT_USER_DATA,
  payload,
});

type setAuth_T = {
  type: typeof SET__AUTH;
  isAuth: boolean;
};

export const setAuth = (isAuth: boolean): setAuth_T => ({
  type: SET__AUTH,
  isAuth,
});

//Thunk
export const getCurrentUser =
  () => async (dispatch: Dispatch<setCurrentUser_T>) => {
    let response = await authAPI.me();
    if (response.data) {
      dispatch(setCurrentUser(response.data));
    }
  };

export const updateCurrentUser =
  (id: string, updatedInfo: updateAccountPayload_T) =>
  async (dispatch: Dispatch<setCurrentUser_T>) => {
    let response = await usersAPI.updateAccount(id, { ...updatedInfo });
    dispatch(setCurrentUser(response.data));
  };

export const updateAvatar =
  (id: string, file: FormData) =>
  async (dispatch: Dispatch<setCurrentUser_T>) => {
    let response = await usersAPI.updateAvatar(id, file);
    dispatch(setCurrentUser(response.data));
  };

export default AuthReducer;
