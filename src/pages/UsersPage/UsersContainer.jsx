import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/reducers/users-reducer";
import Users from "./Users";

const UsersContainer = ({ users, getUsers, pagination }) => {
  const { skip, limit, total } = pagination;
  useEffect(() => {
    getUsers(limit, skip);
  }, []);

  const [currentPage, setcurrentPage] = useState(1);
  const onPageChanged = (pageNumber) => {
    getUsers(limit, pageNumber * limit);
    setcurrentPage(pageNumber + 1);
  };

  return (
    <Users
      users={users}
      pageSize={limit}
      totalItemsCount={total}
      currentPage={currentPage}
      onPageChanged={onPageChanged}
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  pagination: state.users.pagination,
});

export default connect(mapStateToProps, { getUsers })(UsersContainer);
