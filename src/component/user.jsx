import React from "react";
import BookMark from "./bookMark";

const User = ({ user, onRemove, onToggleBookMark }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
            {quality.name}
          </span>
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <BookMark onToggleBookMark={onToggleBookMark} userId={user._id} status={user.bookmark}/>
      </td>
      <td>
        <button
          onClick={() => onRemove(user._id)}
          className={`badge bg-danger`}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default User;
