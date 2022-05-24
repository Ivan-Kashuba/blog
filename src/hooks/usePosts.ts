import { useAppDispatch } from "./useAppDispatch";
import { useSelector } from "react-redux";
import {
  postsPagination_S,
  userPost_S,
  userPosts_S,
} from "../selectors/posts-selector";
import {
  createPost,
  getAllPosts,
  getChoosenPost,
  updatePostImage,
} from "../store/reducers/posts-reducer";
import { useCallback } from "react";
import { setPostsPayload_T } from "../types/reducers";

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const post = useSelector(userPost_S);
  const pagination = useSelector(postsPagination_S);
  const postsArr = useSelector(userPosts_S);

  const _createPost = useCallback(
    (postInfo: setPostsPayload_T) => {
      return dispatch(createPost(postInfo));
    },
    [dispatch]
  );

  const _getAllPosts = useCallback(
    (searchText?: string, id?: string, limit?: number, skip?: number) => {
      return dispatch(getAllPosts(searchText, id, limit, skip));
    },
    [dispatch]
  );

  const _getChoosenPost = useCallback(
    (id: string) => {
      return dispatch(getChoosenPost(id));
    },
    [dispatch]
  );

  const _updatePostImage = useCallback(
    (id: string, image: FormData) => {
      return dispatch(updatePostImage(id, image));
    },
    [dispatch]
  );
  return {
    post,
    pagination,
    postsArr,
    createPost: _createPost,
    getAllPosts: _getAllPosts,
    getChoosenPost: _getChoosenPost,
    updatePostImage: _updatePostImage,
  };
};
