import { ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostEdit from "./PostEdit";
import { postsAPI } from "../../api/api";
import Preloader from "../../components/Preloader/Preloader";
import { setPostsPayload_T } from "../../types/reducers";
import { usePosts } from "../../hooks/usePosts";

export const PostEditContainer = () => {
  const { post, updatePostImage, getChoosenPost } = usePosts();

  const navigation = useNavigate();
  const { postId } = useParams();

  const formData = new FormData();
  const onPostPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      formData.append("image", event.target.files[0]);
      updatePostImage(post._id!, formData);
    }
  };

  useEffect(() => {
    if (postId) {
      getChoosenPost(postId);
    }
  }, [post._id, postId]);

  const updatePost = async (postInfo: setPostsPayload_T) => {
    await postsAPI.updatePost(post._id!, postInfo);
    navigation(`/posts/${post._id}`);
  };

  if (post._id !== postId) {
    return <Preloader />;
  }

  return (
    <PostEdit
      post={post}
      updatePost={updatePost}
      onPostPhotoChange={onPostPhotoChange}
    />
  );
};
