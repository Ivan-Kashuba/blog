import { createReducer, Dispatch } from "@reduxjs/toolkit";
import { commentsAPI } from "../../api/api";
import { transformComments } from "../../utils/tranform";
import { commentsInitialState_T } from "../../types/reducers";
import { Comment } from "../../types/models";

// Constants
const SET__COMMENTS = "SET__COMMENTS";
const SET__NEW__COMMENT = "SET__NEW__COMMENT";
const SET__COMMENT = "SET__COMMENT";

const initialState: commentsInitialState_T = {
  comments: [],
  comment: {
    _id: "",
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
    .addCase(
      SET__COMMENTS,
      (state, action: setComments_T): commentsInitialState_T => {
        return { ...state, comments: [...action.comments] };
      }
    )
    .addCase(
      SET__NEW__COMMENT,
      (state, action: setNewComment_T): commentsInitialState_T => {
        return { ...state, comments: [...state.comments, action.comment] };
      }
    )
    .addCase(
      SET__COMMENT,
      (state, action: setComment_T): commentsInitialState_T => {
        return { ...state, comment: { ...action.comment } };
      }
    );
});

// ActionCreator

type setComments_T = {
  type: typeof SET__COMMENTS;
  comments: Array<Comment>;
};

const setComments = (comments: Array<Comment>): setComments_T => ({
  type: SET__COMMENTS,
  comments,
});

type setNewComment_T = {
  type: typeof SET__NEW__COMMENT;
  comment: Comment;
};

const setNewComment = (comment: Comment): setNewComment_T => ({
  type: SET__NEW__COMMENT,
  comment,
});

type setComment_T = {
  type: typeof SET__COMMENT;
  comment: Comment;
};

const setComment = (comment: Comment): setComment_T => ({
  type: SET__COMMENT,
  comment,
});

//Thunk
export const getComments =
  (postId: string) => async (dispatch: Dispatch<setComments_T>) => {
    const response = await commentsAPI.getComments(postId);
    const comments = transformComments(response.data);
    dispatch(setComments(comments));
  };

export const createComment =
  (postId: string, text: string, commentId: string | null) =>
  async (dispatch: Dispatch<setNewComment_T>) => {
    const response = await commentsAPI.createComment(postId, text, commentId);
    dispatch(setNewComment(response.data));
  };

export const updateComment =
  (commentId: string, text: string) =>
  async (dispatch: Dispatch<setComment_T>) => {
    const response = await commentsAPI.updateComment(commentId, text);
    dispatch(setComment(response.data));
  };

export default CommentsReducer;
