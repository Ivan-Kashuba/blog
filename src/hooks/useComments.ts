import { useAppDispatch } from "./useAppDispatch";
import { useSelector } from "react-redux";
import {
  getPostComment_S,
  getPostComments_S,
} from "../selectors/comments-selector";
import {
  createComment,
  getComments,
  updateComment,
} from "../store/reducers/comments-reducer";
import { useCallback } from "react";

export const useComments = () => {
  const dispatch = useAppDispatch();
  const comments = useSelector(getPostComments_S);
  const comment = useSelector(getPostComment_S);

  const _getComments = useCallback(
    (postId: string) => {
      return dispatch(getComments(postId));
    },
    [dispatch]
  );

  const _createComment = useCallback(
    (postId: string, text: string, commentId: string | null) => {
      return dispatch(createComment(postId, text, commentId));
    },
    [dispatch]
  );

  const _updateComment = useCallback(
    (commentId: string, text: string) => {
      return dispatch(updateComment(commentId, text));
    },
    [dispatch]
  );

  return {
    comments,
    comment,
    getComments: _getComments,
    createComment: _createComment,
    updateComment: _updateComment,
  };
};
