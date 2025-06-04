import React from 'react';

/**
 * TodoItem component represents a single todo entry in the list.
 * Props:
 * - todo: the todo object { id, title, completed, priority, dueDate }
 * - toggleTodo: function to toggle completion status
 * - deleteTodo: function to delete this todo
 */

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  const priorityClass = {
    Low: "priority-low",
    Medium: "priority-medium",
    High: "priority-high"
  }[todo.priority] || "priority-low";

  const formattedDueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString()
    : '';

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      aria-label={`todo-${todo.title}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`toggle ${todo.title}`}
      />
      <span className={`priority-indicator ${priorityClass}`} aria-label={`priority ${todo.priority}`}></span>
      <span className="todo-title">{todo.title}</span>
      {formattedDueDate && (
        <span
          style={{ marginLeft: '10px', fontSize: '0.85rem', color: '#555' }}
          aria-label={`due date ${formattedDueDate}`}
        >
          Due: {formattedDueDate}
        </span>
      )}
      <div className="todo-actions">
        <button
          onClick={() => deleteTodo(todo.id)}
          aria-label={`delete ${todo.title}`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
