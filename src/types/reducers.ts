//auth-reducer
import { Comment, Post, User } from "./models";

export type authInitialState_T = {
  _id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
  extra_details: string | null;
  skills: string | null;
  profession: string | null;
  details: string | null;
  dateCreated: string | null;
  isAuth: boolean | null;
};

//comments-reducer
export type commentsInitialState_T = {
  comments: Array<Comment>;
  comment: Comment;
};

//post-reducer

export type setPostsPayload_T = {
  title: string;
  fullText: string;
  description?: string;
};

export type pagination_T = {
  limit: number | null;
  skip: number | null;
  total: number | null;
};

export type postsInitialState_T = {
  posts: Post;
  pagination: pagination_T;
  postsArr: Array<Post>;
};

export type getPostsPayload_T = {
  pagination: pagination_T;
  data: Array<Post>;
};

// users-reducer

export type usersInitialState_T = {
  userInfo: User;
  users: Array<User>;
  pagination: {} | pagination_T;
  allUsers: Array<User>;
};

export type userRegistration_T = {
  email: string;
  password: string;
  name?: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
};

export type setUsersPayload_T = {
  pagination: pagination_T;
  data: Array<User>;
};
