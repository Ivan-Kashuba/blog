import React from "react";
import Paginator from "../../components/Paginator/Paginator";
import Preloader from "../../components/Preloader/Preloader";
import PostItemContainer from "../PostItem/PostItemContainer";
import PostSearch from "./PostSearch";

const PostList = ({
  currentPage,
  onPageChanged,
  limit,
  total,
  posts,
  inputText,
  onFindPress,
  setInputText,
  onClearPress,
}) => {
  if (posts.length === 0 && !limit) {
    return <Preloader />;
  }

  if (posts.length === 0) {
    return (
      <div className="postPagination">
        <PostSearch
          inputText={inputText}
          setInputText={setInputText}
          onFindPress={onFindPress}
          onClearPress={onClearPress}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="postPagination">
        <PostSearch
          inputText={inputText}
          setInputText={setInputText}
          onFindPress={onFindPress}
          onClearPress={onClearPress}
        />
        {!inputText && (
          <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            pageSize={limit}
            totalItemsCount={total}
          />
        )}
      </div>

      {posts.map((post) => {
        return (
          <PostItemContainer
            post={post}
            key={post._id}
            userId="buttonForPostsFalse"
          />
        );
      })}
    </div>
  );
};

export default PostList;
