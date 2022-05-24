import { createReducer, Dispatch } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/api";
import {
  getPostsPayload_T,
  pagination_T,
  postsInitialState_T,
  setPostsPayload_T,
} from "../../types/reducers";
import { Post } from "../../types/models";
// Constants
const SET__POSTS = "SET__POSTS";
const GET__POSTS = "GET__POSTS";
const GET__CHOOSEN__POST = "GET__CHOOSEN__POST";

const initialState: postsInitialState_T = {
  post: {
    _id: "",
    title: null,
    fullText: null,
    description: null,
    dateCreated: null,
    image: null,
    likes: [],
    postedBy: null,
  },
  pagination: {
    limit: null,
    skip: null,
    total: null,
  },
  postsArr: [],
};

// Reducer
const PostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET__POSTS, (state, action: setPosts_T): postsInitialState_T => {
      return { ...state, postsArr: [action.payload, ...state.postsArr] };
    })

    .addCase(GET__POSTS, (state, action: getPosts_T): postsInitialState_T => {
      return {
        ...state,
        postsArr: [...action.postsArr],
        pagination: { ...action.pagination },
      };
    })
    .addCase(
      GET__CHOOSEN__POST,
      (state, action: setChoosenPost_T): postsInitialState_T => {
        return {
          ...state,
          post: { ...action.payload },
        };
      }
    );
});

// ActionCreator

type setPosts_T = {
  type: typeof SET__POSTS;
  payload: Post;
};

const setPosts = (payload: Post): setPosts_T => ({
  type: SET__POSTS,
  payload,
});

type getPosts_T = {
  type: typeof GET__POSTS;
  postsArr: Array<Post>;
  pagination: pagination_T;
};

const getPosts = (payload: getPostsPayload_T): getPosts_T => ({
  type: GET__POSTS,
  postsArr: payload.data,
  pagination: payload.pagination,
});

type setChoosenPost_T = {
  type: typeof GET__CHOOSEN__POST;
  payload: Post;
};

const setChoosenPost = (payload: Post): setChoosenPost_T => ({
  type: GET__CHOOSEN__POST,
  payload,
});

//Thunk
export const createPost =
  (postInfo: setPostsPayload_T) => async (dispatch: Dispatch<setPosts_T>) => {
    let response = await postsAPI.createPost(postInfo);
    await dispatch(setPosts(response.data));
  };

export const getAllPosts =
  (searchText?: string, id?: string, limit?: number, skip?: number) =>
  async (dispatch: Dispatch<getPosts_T>) => {
    let response = await postsAPI.getAllPosts(searchText, id, limit, skip);
    dispatch(getPosts(response.data));
  };

export const getChoosenPost =
  (id: string) => async (dispatch: Dispatch<setChoosenPost_T>) => {
    let response = await postsAPI.getChoosenPost(id);
    dispatch(setChoosenPost(response.data));
  };

export const updatePostImage =
  (id: string, image: FormData) =>
  async (dispatch: Dispatch<setChoosenPost_T>) => {
    let response = await postsAPI.updatePostImage(id, image);
    dispatch(setChoosenPost(response.data));
  };

export default PostsReducer;
