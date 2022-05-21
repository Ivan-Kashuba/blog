import React from "react";

type props_T = {
  inputText: string;
  onFindPress: () => void;
  setInputText: (text: string) => void;
  onClearPress: () => void;
};

const PostSearch = ({
  inputText,
  setInputText,
  onFindPress,
  onClearPress,
}: props_T) => {
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
