import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import { usePosts } from "../../hooks/usePosts";

export const PostListContainer = () => {
  const { postsArr, pagination, getAllPosts } = usePosts();

  const { limit, total } = pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    getAllPosts();
  }, []);
  const onPageChanged = (pageNumber: number) => {
    getAllPosts("", "", limit!, pageNumber * limit!);
    setCurrentPage(pageNumber + 1);
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
      posts={postsArr}
      inputText={inputText}
      onFindPress={onFindPress}
      setInputText={setInputText}
      onClearPress={onClearPress}
    />
  );
};
