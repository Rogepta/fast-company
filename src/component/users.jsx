import React, { useState } from "react";
import api from "../api";
import User from "./user";
import Table from "./renderTable";
import SearchStatus from "./searchStatus";
import plural from "plural-ru";

const Users = () => {
  const [users, setUsers] = useState(() => api.users.fetchAll());
  const lengthOfUsers = users.length;

  let removeHandler = (userId) => {
    const filteredUsers = users.filter((user) => user._id !== userId);
    setUsers(filteredUsers);
  };

  let renderHeaderNumber = (length) => {
    if (lengthOfUsers === 0) {
      return "Никто с тобой сегодня не тусанет";
    } else {
      return `${length} ${plural(
        length,
        "человек",
        "человека",
        "человек"
      )} сегодня ${plural(length, "тусанет", "тусанут", "тусанет")} с тобой`;
    }
  };

  const toggleBookMark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) return { ...user, bookmark: !user.bookmark };
      else {
        return user;
      }
    });
    setUsers(newUsers);
  };

  return (
    <>
      <SearchStatus
        users={users}
        onRender={renderHeaderNumber}
        length={lengthOfUsers}
      />
      {users.length > 0 && (
        <table className="table">
          <Table />
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
                onRemove={removeHandler}
                onToggleBookMark={toggleBookMark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
