import axios from "axios";
import { setPostsPayload_T } from "../types/reducers";

const instance = axios.create({
  baseURL: "http://test-blog-api.ficuslife.com/api/v1/",
});

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
    return instance.delete(`users/${id}`, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },

  updateAccount(id: string, updatedInfo: updateAccountPayload_T) {
    return instance.patch(
      `users/${id}`,
      { ...updatedInfo },
      { headers: { Authorization: localStorage.getItem("token") as string } }
    );
  },

  updateAvatar(id: string, avatarFile: FormData) {
    return instance.put(`users/upload/${id}`, avatarFile, {
      headers: {
        Authorization: localStorage.getItem("token") as string,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const postsAPI = {
  createPost(postInfo: setPostsPayload_T) {
    return instance.post("/posts", postInfo, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
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
    return instance.delete(`posts/${id}`, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },

  updatePost(id: string, postInfo: setPostsPayload_T) {
    return instance.patch(`posts/${id}`, postInfo, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },

  updatePostImage(id: string, image: FormData) {
    return instance.put(`posts/upload/${id}`, image, {
      headers: {
        Authorization: localStorage.getItem("token") as string,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postLike(id: string) {
    return instance.put(`posts/like/${id}`, null, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
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
      { headers: { Authorization: localStorage.getItem("token") as string } }
    );
  },

  deleteComment(commentId: string) {
    return instance.delete(`comments/${commentId}`, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },

  updateComment(commentId: string, text: string) {
    return instance.patch(
      `comments/${commentId}`,
      { text },
      { headers: { Authorization: localStorage.getItem("token") as string } }
    );
  },

  likeComment(commentId: string) {
    return instance.put(`comments/like/${commentId}`, null, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
  },
};
