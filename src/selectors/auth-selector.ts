import { AppStateType } from "../store/store";

export const getIsAuth_S = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getCurrentUserId_S = (state: AppStateType) => {
  return state.auth._id;
};

export const getCurrentUser_S = (state: AppStateType) => {
  return state.auth;
};
