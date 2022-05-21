import React from "react";
import { NavLink } from "react-router-dom";
import defaultAvatar from "./../../img/defaultAvatar.png";
import { Post, User } from "../../types/models";

type props_T = {
  post: Post;
  deletePost: (postId: string) => void;
  userId: string;
  currentUser?: User;
};

const PostItem = ({ post, deletePost, userId, currentUser }: props_T) => {
  return (
    <div className="postItem">
      <div className="postHeader">
        <div className="postUserInfo">
          <img
            className="postUserInfoAvatar"
            src={
              currentUser && currentUser.avatar
                ? `http://test-blog-api.ficuslife.com${currentUser.avatar}`
                : defaultAvatar
            }
            alt=""
          />
          <div>
            {currentUser ? currentUser.name : "Unknown"}
            <div className="postDate"> {post.dateCreated?.slice(0, 10)}</div>
          </div>
        </div>
        <div className="postTitle">{post.title}</div>
      </div>

      <div className="postDescription">{post.description}</div>
      <div className="postSmall">
        <div> Liked: {post.likes?.length}</div>

        <NavLink to={"/posts/" + post._id}>
          <div>Read more</div>
        </NavLink>
      </div>
      {!userId && (
        <div className="editPost">
          <NavLink to={"/posts/edit/" + post._id}>
            <div className="postItemImageItem">&#9998;</div>
          </NavLink>

          <div
            className="postItemImageItem"
            onClick={() => {
              deletePost(post._id as string);
            }}
          >
            &#128465;
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
