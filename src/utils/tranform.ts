import { Comment } from "../types/models";

export const transformComments = (comments: Array<Comment>) => {
  const resArr = [];
  for (let i = 0; i < comments.length; i++) {
    const followedArr = [];
    for (let j = 0; j < comments.length; j++) {
      if (comments[i]._id === comments[j].followedCommentID) {
        followedArr.push(comments[j]);
      }
    }
    if (!comments[i].followedCommentID) {
      resArr.push({ ...comments[i], followedArr });
    }
  }
  return resArr;
};
