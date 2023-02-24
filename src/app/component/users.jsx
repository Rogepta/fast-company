import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import Table from "./renderTable";
import SearchStatus from "./searchStatus";
import plural from "plural-ru";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(() => api.users.fetchAll());
    const lengthOfUsers = users.length;
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

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

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty="_id"
                        contentProperty="name"
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus
                    users={users}
                    onRender={renderHeaderNumber}
                    length={count}
                />
                {count > 0 && (
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    handlePageChange: PropTypes.func
};
export default Users;
