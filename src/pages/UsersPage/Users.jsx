import React from "react";
import UserItem from "./UserItem";
import Preloader from "./../../components/Preloader/Preloader";
import Paginator from "../../components/Paginator/Paginator";

const Users = ({
  users,
  pageSize,
  totalItemsCount,
  onPageChanged,
  currentPage,
}) => {
  if (users.length === 0) {
    return <Preloader />;
  } else
    return (
      <>
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
        />
        <div>
          {users.map((user) => {
            return <UserItem key={user._id} user={user} />;
          })}
        </div>
      </>
    );
};

export default Users;
