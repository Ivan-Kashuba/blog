import { createReducer, Dispatch } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api";
import {
  setUsersPayload_T,
  userRegistration_T,
  usersInitialState_T,
} from "../../types/reducers";
import { User } from "../../types/models";

// Constants
const CREATE__USER = "CREATE__USER";
const SET__USERS = "SET__USERS";
const SET__CHOOSEN__USER = "SET__CHOOSEN__USER";
const SET__ALL__USERS = "SET__ALL__USERS";

const initialState: usersInitialState_T = {
  userInfo: {
    _id: "",
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
  allUsers: [],
};

// Reducer
const UsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      CREATE__USER,
      (state, action: setRegisteredUsers_T): usersInitialState_T => {
        return { ...state, userInfo: { ...action.payload } };
      }
    )
    .addCase(SET__USERS, (state, action: setUsers_T): usersInitialState_T => {
      return {
        ...state,
        users: [...action.payload.data],
        pagination: { ...action.payload.pagination },
      };
    })
    .addCase(
      SET__CHOOSEN__USER,
      (state, action: setChoosenUser_T): usersInitialState_T => {
        return { ...state, userInfo: { ...action.payload } };
      }
    )
    .addCase(
      SET__ALL__USERS,
      (state, action: setAllUsers_T): usersInitialState_T => {
        return { ...state, allUsers: action.payload.data };
      }
    );
});

// ActionCreator

type setRegisteredUsers_T = {
  type: typeof CREATE__USER;
  payload: User;
};

const setRegisteredUsers = (payload: User): setRegisteredUsers_T => ({
  type: CREATE__USER,
  payload,
});

type setUsers_T = {
  type: typeof SET__USERS;
  payload: setUsersPayload_T;
};
const setUsers = (payload: setUsersPayload_T): setUsers_T => ({
  type: SET__USERS,
  payload,
});

type setChoosenUser_T = {
  type: typeof SET__CHOOSEN__USER;
  payload: User;
};

const setChoosenUser = (payload: User): setChoosenUser_T => ({
  type: SET__CHOOSEN__USER,
  payload,
});

type setAllUsers_T = {
  type: typeof SET__ALL__USERS;
  payload: setUsersPayload_T;
};

const setAllUsers = (payload: setUsersPayload_T): setAllUsers_T => ({
  type: SET__ALL__USERS,
  payload,
});

//Thunk
export const registerUser =
  (registerObject: userRegistration_T) =>
  async (dispatch: Dispatch<setRegisteredUsers_T>) => {
    let response = await usersAPI.registration(registerObject);
    await dispatch(setRegisteredUsers(response.data));
  };

export const getUsers =
  (limit = 10, skip = 0) =>
  async (dispatch: Dispatch<setUsers_T>) => {
    let response = await usersAPI.getUsers(limit, skip);
    dispatch(setUsers(response.data));
  };

export const getChoosenUser =
  (id: string) => async (dispatch: Dispatch<setChoosenUser_T>) => {
    let response = await usersAPI.getChoosenUser(id);
    dispatch(setChoosenUser(response.data));
  };

export const getAllUsers =
  (limit = 500, skip = 0) =>
  async (dispatch: Dispatch<setAllUsers_T>) => {
    let response = await usersAPI.getUsers(limit, skip);
    dispatch(setAllUsers(response.data));
  };

export default UsersReducer;
