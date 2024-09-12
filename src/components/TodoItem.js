// src/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, toggle, delete: deleteTodo }) => {
    return (
        <li
            onClick={toggle}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
            {todo.text}
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(); }}>Delete</button>
        </li>
    );
};

export default TodoItem;
