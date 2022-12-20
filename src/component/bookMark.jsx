import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, userId, status }) => {
    return (
        <button onClick={() => onToggleBookMark(userId)}>
            <i className={"bi bi-plus-circle" + (!status ? "" : "-fill")}></i>
        </button>
    );
};

BookMark.propTypes = {
    onToggleBookMark: PropTypes.func,
    userId: PropTypes.string,
    status: PropTypes.bool
};

export default BookMark;
