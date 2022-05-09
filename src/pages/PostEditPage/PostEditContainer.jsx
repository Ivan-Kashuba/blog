import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostEdit from "./PostEdit";
import { getChoosenPost } from "../../store/reducers/posts-reducer";
import { postsAPI } from "../../api/api";
import { updatePostImage } from "../../store/reducers/posts-reducer";
import Preloader from "./../../components/Preloader/Preloader";

const PostEditContainer = ({ post, getChoosenPost, updatePostImage }) => {
  const navigation = useNavigate();
  const { postId } = useParams();

  const formData = new FormData();
  const onPostPhotoChange = (event) => {
    if (event.target.files.length) {
      formData.append("image", event.target.files[0]);
      updatePostImage(post._id, formData);
    }
  };

  useEffect(() => {
    getChoosenPost(postId);
  }, [post._id, postId]);

  const updatePost = async (postInfo) => {
    await postsAPI.updatePost(post._id, postInfo);
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

const mapStateToProps = (state) => ({
  post: state.posts.posts,
});

export default connect(mapStateToProps, { getChoosenPost, updatePostImage })(
  PostEditContainer
);
