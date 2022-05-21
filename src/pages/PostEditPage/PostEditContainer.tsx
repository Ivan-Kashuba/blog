import { ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostEdit from "./PostEdit";
import { getChoosenPost } from "../../store/reducers/posts-reducer";
import { postsAPI } from "../../api/api";
import { updatePostImage } from "../../store/reducers/posts-reducer";
import Preloader from "../../components/Preloader/Preloader";
import { Post } from "../../types/models";
import { AppStateType } from "../../store/store";
import { setPostsPayload_T } from "../../types/reducers";

type props_T = {
  post: Post;
  getChoosenPost: (postId: string) => Promise<void>;
  updatePostImage: (postId: string, imgData: FormData) => Promise<void>;
};

const PostEditContainer = ({
  post,
  getChoosenPost,
  updatePostImage,
}: props_T) => {
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

const mapStateToProps = (state: AppStateType) => ({
  post: state.posts.posts,
});

export default connect(mapStateToProps, { getChoosenPost, updatePostImage })(
  PostEditContainer
);
