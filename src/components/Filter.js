import React from 'react';
import './Filter.css';

const Filter = ({ setFilter, filter }) => {
    return (
        <div className="filter-container">
            <label>Filter: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    );
};

export default Filter;
