import React from "react";

const BookMark = ({ onToggleBookMark, userId, status }) => {
  console.log(status);

  return (
    <button onClick={() => onToggleBookMark(userId)}>
      <i className={"bi bi-plus-circle" + (!status ? "" : "-fill")}></i>
    </button>
  );
};

export default BookMark;
