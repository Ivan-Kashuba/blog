import { AppStateType } from "../store/store";

export const userPosts_S = (state: AppStateType) => {
  return state.post.postsArr;
};

export const userPost_S = (state: AppStateType) => {
  return state.post.post;
};

export const postsPagination_S = (state: AppStateType) => {
  return state.post.pagination;
};
