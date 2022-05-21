import { combineReducers } from "redux";
import AuthReducer from "./reducers/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./reducers/users-reducer";
import PostsReducer from "./reducers/posts-reducer";
import CommentsReducer from "./reducers/comments-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = configureStore({ reducer: rootReducer });

export default store;
