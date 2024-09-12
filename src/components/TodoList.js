import React, { useState } from 'react';
import './TodoList.css';
import CircularProgress from '@mui/material/CircularProgress';

const TodoList = ({ tasks, deleteTask }) => {
    const [loadingId, setLoadingId] = useState(null);


    const handleDelete = (taskId) => {
        setLoadingId(taskId);
        setTimeout(() => {
            deleteTask(taskId);
            setLoadingId(null);
        }, 1000);
    };

    return (
        <div className="table-wrapper">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.text}</td>
                                <td>{task.status}</td>
                                <td className="action-cell">
                                    <div className="button-loader-container">
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(task.id)}
                                            disabled={loadingId === task.id}
                                        >
                                            Delete
                                        </button>
                                        {loadingId === task.id && (
                                            <CircularProgress
                                                size={24}
                                                className="loader"
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-tasks">
                                No tasks available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
