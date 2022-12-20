import React from "react";

const searchStatus = ({ onRender, length }) => {
    return <header className="badge bg-danger">{onRender(length)}</header>;
};

export default searchStatus;
