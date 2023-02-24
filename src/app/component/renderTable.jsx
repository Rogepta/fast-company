import React from "react";
import PropTypes from "prop-types";

const Table = ({ onSort }) => {
    return (
        <thead>
            <tr>
                <th onClick={() => onSort("name")}>Имя</th>
                <th>Качества</th>
                <th onClick={() => onSort("profession.name")}>Профессия</th>
                <th onClick={() => onSort("completedMeetings")}>
                    Встретился, раз
                </th>
                <th onClick={() => onSort("rate")}>Оценка</th>
                <th onClick={() => onSort("bookmark")}>Избранное</th>
                <th />
            </tr>
        </thead>
    );
};

Table.propTypes = {
    onSort: PropTypes.func.isRequired
};

export default Table;
