import React from "react";
import likeActive from "./../../img/likeActive.png";
import likeIcon from "./../../img/like.png";
import defaultPostImage from "./../../img/defaultPostImage.jpg";
import { Post } from "../../types/models";

type props_T = {
  post: Post;
  likePost: (postId: string) => void;
  isLikedPost?: string;
};

const PostDetails = ({ post, likePost, isLikedPost }: props_T) => {
  return (
    <div className="postDetailsContainer">
      <h1 className="postDetailsMainText">{post.title}</h1>
      <div className="postDetailsMainContent">
        <div>
          <img
            className="postImage"
            src={
              post.image
                ? `http://test-blog-api.ficuslife.com${post.image}`
                : defaultPostImage
            }
            alt=""
          />
        </div>
        <div className="postDetailsContent">
          <strong>Short description about this post: </strong>
          <div>{post.description}</div>
          <div className="postFullText">{post.fullText}</div>
          <div className="postDetailsInfo">
            <div className="postLikeImg">
              <img
                onClick={() => likePost(post._id!)}
                className="likeImg"
                src={isLikedPost ? likeActive : likeIcon}
                alt=""
              />
              <div>Liked:{post.likes?.length}</div>
            </div>

            <div>Created: {post.dateCreated?.slice(0, 10)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
