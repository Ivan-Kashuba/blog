import axios from "axios";
import { setPostsPayload_T } from "../types/reducers";

const instance = axios.create({
  baseURL: "http://test-blog-api.ficuslife.com/api/v1/",
});

const updateAvatarConfig = {
  headers: {
    Authorization: localStorage.getItem("token") as string,
    "Content-Type": "multipart/form-data",
  },
};

const loginSuccess = {
  headers: { Authorization: localStorage.getItem("token") as string },
};

export type loginParams_T = {
  email: string;
  password: string;
};

export type registerObject_T = {
  email: string;
  password: string;
  name?: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
};

export type updateAccountPayload_T = {
  name?: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
};

export const authAPI = {
  me() {
    return instance.get("auth/user", {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },

  login({ email, password }: loginParams_T) {
    return instance.post("auth", {
      email,
      password,
    });
  },
};

export const usersAPI = {
  registration(registerObject: registerObject_T) {
    return instance.post("users", { ...registerObject });
  },

  getUsers(limit: number, skip: number) {
    return instance.get(`users?limit=${limit}&skip=${skip}`);
  },

  getChoosenUser(id: string) {
    return instance.get(`users/${id}`);
  },

  deleteAccount(id: string) {
    return instance.delete(`users/${id}`, loginSuccess);
  },

  updateAccount(id: string, updatedInfo: updateAccountPayload_T) {
    return instance.patch(`users/${id}`, { ...updatedInfo }, loginSuccess);
  },

  updateAvatar(id: string, avatarFile: FormData) {
    return instance.put(`users/upload/${id}`, avatarFile, updateAvatarConfig);
  },
};

export const postsAPI = {
  createPost(postInfo: setPostsPayload_T) {
    return instance.post("/posts", postInfo, loginSuccess);
  },

  getAllPosts(searchText = "", id = "", limit = 10, skip = 0) {
    return instance.get(
      `posts?search=${searchText}&postedBy=${id}&limit=${limit}&skip=${skip}`
    );
  },

  getChoosenPost(id: string) {
    return instance.get(`posts/${id}`);
  },

  deletePost(id: string) {
    return instance.delete(`posts/${id}`, loginSuccess);
  },

  updatePost(id: string, postInfo: setPostsPayload_T) {
    return instance.patch(`posts/${id}`, postInfo);
  },

  updatePostImage(id: string, image: FormData) {
    return instance.put(`posts/upload/${id}`, image);
  },

  postLike(id: string) {
    return instance.put(`posts/like/${id}`, null, loginSuccess);
  },
};

export const commentsAPI = {
  getComments(postId: string) {
    return instance.get(`comments/post/${postId}`);
  },

  createComment(postId: string, text: string, commentId: string | null) {
    return instance.post(
      `comments/post/${postId}`,
      {
        text: text,
        followedCommentID: commentId,
      },
      loginSuccess
    );
  },

  deleteComment(commentId: string) {
    return instance.delete(`comments/${commentId}`, loginSuccess);
  },

  updateComment(commentId: string, text: string) {
    return instance.patch(`comments/${commentId}`, { text }, loginSuccess);
  },

  likeComment(commentId: string) {
    return instance.put(`comments/like/${commentId}`, null, loginSuccess);
  },
};
