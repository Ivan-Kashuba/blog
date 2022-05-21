import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUsers, getUsers } from "../../store/reducers/users-reducer";
import Users from "./Users";
import { User } from "../../types/models";
import { pagination_T } from "../../types/reducers";
import { AppStateType } from "../../store/store";

type props_T = {
  users: Array<User>;
  getUsers: (limit: number, skip: number) => void;
  pagination: {} | pagination_T;
  getAllUsers: (limit: number, skip: number) => void;
  allUsers: Array<User>;
};

const UsersContainer = ({
  users,
  getUsers,
  pagination,
  getAllUsers,
  allUsers,
}: props_T) => {
  const { skip, limit, total } = pagination as pagination_T;

  useEffect(() => {
    getUsers(limit as number, skip as number);
  }, []);

  useEffect(() => {
    getAllUsers(total as number, 0);
  }, [total]);

  const [currentPage, setcurrentPage] = useState(1);
  const onPageChanged = (pageNumber: number) => {
    getUsers(limit!, pageNumber * limit!);
    setcurrentPage(pageNumber + 1);
  };

  return (
    <Users
      users={users}
      pageSize={limit!}
      totalItemsCount={total!}
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      allUsers={allUsers}
    />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  users: state.users.users,
  pagination: state.users.pagination,
  allUsers: state.users.allUsers,
});

export default connect(mapStateToProps, { getUsers, getAllUsers })(
  UsersContainer
);
