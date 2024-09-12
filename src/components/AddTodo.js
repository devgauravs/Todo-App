import React, { useState } from 'react';
import './AddTodo.css';
import CircularProgress from '@mui/material/CircularProgress';

const AddTodo = ({ addTask, taskLength }) => {
    const [taskText, setTaskText] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [errors, setErrors] = useState({ taskText: '', taskStatus: '' });
    const [loading, setLoading] = useState(false);
    const handleAddTask = () => {
        let valid = true;
        const newErrors = { taskText: '', taskStatus: '' };

        if (taskText.trim() === '') {
            newErrors.taskText = 'Please enter a task';
            valid = false;
        }

        if (taskStatus === '') {
            newErrors.taskStatus = 'Please select the task status';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        const newTask = {
            id: taskLength + 1,
            text: taskText,
            status: taskStatus,
        };


        setTimeout(() => {
            addTask(newTask);
            setTaskText('');
            setTaskStatus('');
            setErrors({ taskText: '', taskStatus: '' });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className={`add-todo-container ${loading ? 'blur' : ''}`}>
            <div className="input-row">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        className={errors.taskText ? 'error' : ''}
                    />
                    {errors.taskText && <p className="error-message">{errors.taskText}</p>}
                </div>
                <div className="input-group">
                    <select
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        className={errors.taskStatus ? 'error' : ''}
                    >
                        <option value="">--Select--</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                    {errors.taskStatus && <p className="error-message">{errors.taskStatus}</p>}
                </div>
                <button onClick={handleAddTask}>Add</button>
            </div>

            {loading && (
                <div className="loader-overlay">
                    <div className="loader-container">
                        <CircularProgress />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTodo;
