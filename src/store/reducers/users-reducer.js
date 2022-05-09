import { createReducer } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api";
// Constants
const CREATE__USER = "CREATE__USER";
const SET__USERS = "SET__USERS";
const SET__CHOOSEN__USER = "SET__CHOOSEN__USER";

const initialState = {
  userInfo: {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    extra_details: null,
    skills: null,
    profession: null,
    details: null,
    dateCreated: null,
  },
  users: [],
  pagination: {},
};

// Reducer
const UsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE__USER, (state, action) => {
      return { ...state, userInfo: { ...action.payload } };
    })
    .addCase(SET__USERS, (state, action) => {
      return {
        ...state,
        users: [...action.payload.data],
        pagination: { ...action.payload.pagination },
      };
    })
    .addCase(SET__CHOOSEN__USER, (state, action) => {
      return { ...state, userInfo: { ...action.payload } };
    });
});

// ActionCreator
const setRegisteredUsers = (payload) => ({
  type: CREATE__USER,
  payload,
});

const setUsers = (payload) => ({
  type: SET__USERS,
  payload,
});

const setChoosenUser = (payload) => ({
  type: SET__CHOOSEN__USER,
  payload,
});

//Thunk
export const registerUser = (registerObject) => async (dispatch) => {
  let response = await usersAPI.registration(registerObject);
  await dispatch(setRegisteredUsers(response.data));
};

export const getUsers =
  (limit = 10, skip = 0) =>
  async (dispatch) => {
    let response = await usersAPI.getUsers(limit, skip);
    dispatch(setUsers(response.data));
  };

export const getChoosenUser = (id) => async (dispatch) => {
  let response = await usersAPI.getChoosenUser(id);
  dispatch(setChoosenUser(response.data));
};

export default UsersReducer;
