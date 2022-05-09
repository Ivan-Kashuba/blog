import axios from "axios";

const instance = axios.create({
  baseURL: "http://test-blog-api.ficuslife.com/api/v1/",
  headers: { Authorization: localStorage.getItem("token") },
});

export const authAPI = {
  me() {
    return instance.get("auth/user", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },

  login({ email, password }) {
    return instance.post("auth", {
      email,
      password,
    });
  },
};

export const usersAPI = {
  registration(registerObject) {
    return instance.post("users", { ...registerObject });
  },

  getUsers(limit = 10, skip = 0) {
    return instance.get(`users?limit=${limit}&skip=${skip}`);
  },

  getChoosenUser(id) {
    return instance.get(`users/${id}`);
  },

  deleteAccount(id) {
    return instance.delete(`users/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },

  updateAccount(id, updatedInfo) {
    return instance.patch(
      `users/${id}`,
      { ...updatedInfo },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  },

  updateAvatar(id, avatarFile) {
    return instance.put(`users/upload/${id}`, avatarFile, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const postsAPI = {
  createPost(postInfo) {
    return instance.post("/posts", postInfo, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  getAllPosts(searchText = "", id = "", limit = 10, skip = 0) {
    return instance.get(
      `posts?search=${searchText}&postedBy=${id}&limit=${limit}&skip=${skip}`
    );
  },

  getChoosenPost(id) {
    return instance.get(`posts/${id}`);
  },

  deletePost(id) {
    return instance.delete(`posts/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },

  updatePost(id, postInfo) {
    return instance.patch(`posts/${id}`, postInfo);
  },

  updatePostImage(id, image) {
    return instance.put(`posts/upload/${id}`, image);
  },

  postLike(id) {
    return instance.put(`posts/like/${id}`, null, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
};

export const commentsAPI = {
  getComments(postId) {
    return instance.get(`comments/post/${postId}`);
  },

  createComment(postId, text, commentId) {
    return instance.post(
      `comments/post/${postId}`,
      {
        text: text,
        followedCommentID: commentId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  },

  deleteComment(commentId) {
    return instance.delete(`comments/${commentId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  updateComment(commentId, text) {
    return instance.patch(
      `comments/${commentId}`,
      { text },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  },

  likeComment(commentId) {
    return instance.put(`comments/like/${commentId}`, null, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
};
