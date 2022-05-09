import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../store/reducers/posts-reducer";
import PostList from "./PostList";

const PostListContainer = ({ getAllPosts, posts, pagination }) => {
  const { limit, total } = pagination;
  const [currentPage, setcurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    getAllPosts();
  }, []);
  const onPageChanged = (pageNumber) => {
    getAllPosts("", "", limit, pageNumber * limit);
    setcurrentPage(pageNumber + 1);
  };

  const onFindPress = () => {
    if (inputText.length !== 0) {
      getAllPosts(inputText, "", total, 0);
    }
  };

  const onClearPress = async () => {
    await getAllPosts();
    setInputText("");
  };

  return (
    <PostList
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      limit={limit}
      total={total}
      posts={posts}
      inputText={inputText}
      onFindPress={onFindPress}
      setInputText={setInputText}
      onClearPress={onClearPress}
    />
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.postsArr,
  pagination: state.posts.pagination,
});
export default connect(mapStateToProps, { getAllPosts })(PostListContainer);
