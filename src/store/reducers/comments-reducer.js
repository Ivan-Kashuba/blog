import { createReducer } from "@reduxjs/toolkit";
import { commentsAPI } from "../../api/api";
import { transformComments } from "./../../utils/tranform";

// Constants
const SET__COMMENTS = "SET__COMMENTS";
const SET__NEW__COMMENT = "SET__NEW__COMMENT";
const SET__COMMENT = "SET__COMMENT";

const initialState = {
  comments: [],
  comment: {
    _id: null,
    commentedBy: null,
    followedCommentID: null,
    postID: null,
    text: null,
    dateCreated: null,
    likes: [],
  },
};

// Reducer
const CommentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET__COMMENTS, (state, action) => {
      return { ...state, comments: [...action.comments] };
    })
    .addCase(SET__NEW__COMMENT, (state, action) => {
      return { ...state, comments: [...state.comments, action.comment] };
    })
    .addCase(SET__COMMENT, (state, action) => {
      return { ...state, comment: { ...action.comment } };
    });
});

// ActionCreator
const setComments = (comments) => ({
  type: SET__COMMENTS,
  comments,
});

const setNewComment = (comment) => ({
  type: SET__NEW__COMMENT,
  comment,
});

const setComment = (comment) => ({
  type: SET__COMMENT,
  comment,
});
//Thunk
export const getComments = (postId) => async (dispatch) => {
  const response = await commentsAPI.getComments(postId);
  const comments = transformComments(response.data);
  dispatch(setComments(comments));
};

export const createComment = (postId, text, commentId) => async (dispatch) => {
  const response = await commentsAPI.createComment(postId, text, commentId);
  dispatch(setNewComment(response.data));
};

export const updateComment = (commentId, text) => async (dispatch) => {
  const response = await commentsAPI.updateComment(commentId, text);
  dispatch(setComment(response.data));
};

export default CommentsReducer;
