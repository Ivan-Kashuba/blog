import { AppStateType } from "../store/store";

export const getUsersPagination_S = (state: AppStateType) => {
  return state.users.pagination;
};

export const getUsers_S = (state: AppStateType) => {
  return state.users.users;
};

export const getAllUsers_S = (state: AppStateType) => {
  return state.users.allUsers;
};

export const getChoosenUser_S = (state: AppStateType) => {
  return state.users.userInfo;
};
