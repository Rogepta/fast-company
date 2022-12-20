import React, { useState } from "react";
import api from "../api";
import User from "./user";
import Table from "./renderTable";
import SearchStatus from "./searchStatus";
import plural from "plural-ru";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = () => {
    const [users, setUsers] = useState(() => api.users.fetchAll());
    const lengthOfUsers = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const removeHandler = (userId) => {
        const filteredUsers = users.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
    };

    const renderHeaderNumber = (length) => {
        if (lengthOfUsers === 0) {
            return "Никто с тобой сегодня не тусанет";
        } else {
            return `${length} ${plural(
                length,
                "человек",
                "человека",
                "человек"
            )} сегодня ${plural(
                length,
                "тусанет",
                "тусанут",
                "тусанет"
            )} с тобой`;
        }
    };

    const toggleBookMark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            } else {
                return user;
            }
        });
        setUsers(newUsers);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            <SearchStatus
                users={users}
                onRender={renderHeaderNumber}
                length={lengthOfUsers}
            />
            {lengthOfUsers > 0 && (
                <table className="table">
                    <Table />
                    <tbody>
                        {userCrop.map((user) => (
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
            <Pagination
                itemsCount={lengthOfUsers}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    handlePageChange: PropTypes.func
};
export default Users;
