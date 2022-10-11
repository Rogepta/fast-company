import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
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

  return (
    <>
      <header className="badge bg-primary">
        {renderHeaderNumber(lengthOfUsers)}
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} user={user} onRemove={removeHandler} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
