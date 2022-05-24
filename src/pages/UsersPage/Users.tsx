import React, { useEffect, useState } from "react";
import Preloader from "../../components/Preloader/Preloader";
import Paginator from "../../components/Paginator/Paginator";
import UsersCards from "./UsersCards";
import UserGraph from "./UserGraph";
import { useUsers } from "../../hooks/useUsers";
import { pagination_T } from "../../types/reducers";

export const Users = () => {
  const { users, pagination, getUsers, getAllUsers } = useUsers();
  const { limit, skip, total } = pagination as pagination_T;

  useEffect(() => {
    getUsers(limit as number, skip as number);
  }, []);

  useEffect(() => {
    getAllUsers(total as number, 0);
  }, [total]);

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (pageNumber: number) => {
    getUsers(limit!, pageNumber * limit!);
    setCurrentPage(pageNumber + 1);
  };

  if (users.length === 0) {
    return <Preloader />;
  } else
    return (
      <>
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          totalItemsCount={total as number}
          pageSize={limit as number}
        />
        <UserGraph />
        <UsersCards />
      </>
    );
};
