import { createReducer } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/api";
// Constants
const SET__POSTS = "SET__POSTS";
const GET__POSTS = "GET__POSTS";
const GET__CHOOSEN__POST = "GET__CHOOSEN__POST";

const initialState = {
  posts: {
    _id: null,
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
    .addCase(SET__POSTS, (state, action) => {
      return { ...state, postsArr: [action.payload, ...state.postsArr] };
    })

    .addCase(GET__POSTS, (state, action) => {
      return {
        ...state,
        postsArr: [...action.postsArr],
        pagination: { ...action.pagination },
      };
    })
    .addCase(GET__CHOOSEN__POST, (state, action) => {
      return {
        ...state,
        posts: { ...action.payload },
      };
    });
});

// ActionCreator
const setPosts = (payload) => ({
  type: SET__POSTS,
  payload,
});

const getPosts = (payload) => ({
  type: GET__POSTS,
  postsArr: payload.data,
  pagination: payload.pagination,
});

const setChoosenPost = (payload) => ({
  type: GET__CHOOSEN__POST,
  payload,
});

//Thunk
export const createPost = (postInfo) => async (dispatch) => {
  let response = await postsAPI.createPost(postInfo);
  await dispatch(setPosts(response.data));
};

export const getAllPosts =
  (searchText, id, limit, skip) => async (dispatch) => {
    let response = await postsAPI.getAllPosts(searchText, id, limit, skip);
    dispatch(getPosts(response.data));
  };

export const getChoosenPost = (id) => async (dispatch) => {
  let response = await postsAPI.getChoosenPost(id);
  dispatch(setChoosenPost(response.data));
};

export const updatePostImage = (id, image) => async (dispatch) => {
  let response = await postsAPI.updatePostImage(id, image);
  dispatch(setChoosenPost(response.data));
};

export default PostsReducer;
