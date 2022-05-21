import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../store/reducers/posts-reducer";
import PostList from "./PostList";
import { AppStateType } from "../../store/store";
import { Post } from "../../types/models";
import { pagination_T } from "../../types/reducers";

type props_T = {
  getAllPosts: (
    searchText?: string,
    id?: string,
    limit?: number,
    skip?: number
  ) => void;
  posts: Array<Post>;
  pagination: pagination_T;
};

const PostListContainer = ({ getAllPosts, posts, pagination }: props_T) => {
  const { limit, total } = pagination;
  const [currentPage, setcurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    getAllPosts();
  }, []);
  const onPageChanged = (pageNumber: number) => {
    getAllPosts("", "", limit!, pageNumber * limit!);
    setcurrentPage(pageNumber + 1);
  };

  const onFindPress = () => {
    if (inputText.length !== 0) {
      getAllPosts(inputText, "", total!, 0);
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
      limit={limit!}
      total={total!}
      posts={posts}
      inputText={inputText}
      onFindPress={onFindPress}
      setInputText={setInputText}
      onClearPress={onClearPress}
    />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  posts: state.posts.postsArr,
  pagination: state.posts.pagination,
});
export default connect(mapStateToProps, { getAllPosts })(PostListContainer);
