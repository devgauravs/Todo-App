import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import './TodoApp.css';
import CircularProgress from '@mui/material/CircularProgress';
const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadTasks = () => {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const savedFilter = localStorage.getItem('filter') || 'all';
            setTasks(savedTasks);
            setFilter(savedFilter);
        };

        loadTasks();


        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);


        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);


    useEffect(() => {
        localStorage.setItem('filter', filter);
    }, [filter]);

    // Add a new task
    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Delete a task
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Filter based on the selected filter option
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.status === 'completed';
        } else if (filter === 'pending') {
            return task.status === 'incomplete';
        }
        return true;
    });

    return (
        <div className={`app-container ${loading ? 'blur' : ''}`}>
            <h1>Todo List</h1>


            <div className="component-container add-todo">
                <AddTodo addTask={addTask} taskLength={tasks.length} />
            </div>


            <div className="component-container filter">
                <Filter setFilter={setFilter} filter={filter} />
            </div>


            <TodoList tasks={filteredTasks} deleteTask={deleteTask} />

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

export default TodoApp;
