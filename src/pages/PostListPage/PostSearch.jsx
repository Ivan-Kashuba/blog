import React from "react";

const PostSearch = ({ inputText, setInputText, onFindPress, onClearPress }) => {
  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        placeholder="Title search..."
      />
      <button
        onClick={() => {
          onFindPress();
        }}
      >
        Find
      </button>
      <button
        onClick={() => {
          onClearPress();
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default PostSearch;
