import { useAppDispatch } from "./useAppDispatch";
import { useCallback } from "react";
import {
  getAllUsers,
  getChoosenUser,
  getUsers,
  registerUser,
} from "../store/reducers/users-reducer";
import { useSelector } from "react-redux";
import {
  getAllUsers_S,
  getChoosenUser_S,
  getUsers_S,
  getUsersPagination_S,
} from "../selectors/users-selector";
import { userRegistration_T } from "../types/reducers";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers_S);
  const pagination = useSelector(getUsersPagination_S);
  const allUsers = useSelector(getAllUsers_S);
  const chosenUser = useSelector(getChoosenUser_S);

  const _getUsers = useCallback(
    (limit: number, skip: number) => {
      return dispatch(getUsers(limit, skip));
    },
    [dispatch]
  );

  const _getAllUsers = useCallback(
    (limit: number, skip: number) => {
      return dispatch(getAllUsers(limit, skip));
    },
    [dispatch]
  );

  const _registerUser = useCallback(
    (registerObject: userRegistration_T) => {
      return dispatch(registerUser(registerObject));
    },
    [dispatch]
  );

  const _getChoosenUser = useCallback(
    (id: string) => {
      return dispatch(getChoosenUser(id));
    },
    [dispatch]
  );

  return {
    users,
    pagination,
    allUsers,
    chosenUser,
    getUsers: _getUsers,
    getAllUsers: _getAllUsers,
    registerUser: _registerUser,
    getChoosenUser: _getChoosenUser,
  };
};
