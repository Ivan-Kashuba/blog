import { AppStateType } from "../store/store";

export const getPostComments_S = (state: AppStateType) => {
  return state.comments.comments;
};

export const getPostComment_S = (state: AppStateType) => {
  return state.comments.comment;
};
