import React from "react";
import Preloader from "../../components/Preloader/Preloader";
import Paginator from "../../components/Paginator/Paginator";
import UsersCards from "./UsersCards";
import UserGraph from "./UserGraph";
import { User } from "../../types/models";

type props_T = {
  users: Array<User>;
  pageSize: number;
  totalItemsCount: number;
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  allUsers: Array<User>;
};

const Users = ({
  users,
  pageSize,
  totalItemsCount,
  onPageChanged,
  currentPage,
  allUsers,
}: props_T) => {
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
        <UserGraph allUsers={allUsers} />
        <UsersCards users={users} />
      </>
    );
};

export default Users;
