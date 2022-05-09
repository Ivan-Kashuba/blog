import React, { useState } from "react";

const Paginator = ({
  currentPage,
  onPageChanged,
  totalItemsCount,
  pageSize,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 0; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / pageSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
  let rightPortionPageNumber = portionNumber * pageSize;
  return (
    <div className="paginator">
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          &#8592;
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              className={currentPage === page ? "selectedPage" : "pageNumber"}
              key={page}
              onClick={() => {
                onPageChanged(page - 1);
              }}
            >
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default Paginator;
