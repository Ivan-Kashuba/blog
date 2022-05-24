import { useAppDispatch } from "./useAppDispatch";
import { useSelector } from "react-redux";
import {
  getCurrentUser_S,
  getCurrentUserId_S,
  getIsAuth_S,
} from "../selectors/auth-selector";
import {
  getCurrentUser,
  updateAvatar,
  updateCurrentUser,
} from "../store/reducers/auth-reducer";
import { useCallback } from "react";
import { updateAccountPayload_T } from "../api/api";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsAuth_S);
  const currentUserId = useSelector(getCurrentUserId_S);
  const currentUser = useSelector(getCurrentUser_S);

  const _getCurrentUser = useCallback(() => {
    return dispatch(getCurrentUser());
  }, [dispatch]);

  const _updateCurrentUser = useCallback(
    (id: string, updatedInfo: updateAccountPayload_T) => {
      return dispatch(updateCurrentUser(id, updatedInfo));
    },
    [dispatch]
  );

  const _updateAvatar = useCallback(
    (id: string, file: FormData) => {
      return dispatch(updateAvatar(id, file));
    },
    [dispatch]
  );

  return {
    isAuth,
    currentUserId,
    currentUser,
    getCurrentUser: _getCurrentUser,
    updateCurrentUser: _updateCurrentUser,
    updateAvatar: _updateAvatar,
  };
};
