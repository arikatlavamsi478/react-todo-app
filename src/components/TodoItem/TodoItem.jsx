import React, { useState } from 'react';
import './TodoItem.css';

/**
 * TodoItem component represents a single todo entry in the list.
 * Props:
 * - todo: the todo object { id, title, completed, priority, dueDate }
 * - toggleTodo: function to toggle completion status
 * - deleteTodo: function to delete this todo
 */

const PRIORITY_CLASSES = {
  Low: "priority-low",
  Medium: "priority-medium",
  High: "priority-high"
};

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? todo.dueDate.slice(0, 10) : '');

  const priorityClass = PRIORITY_CLASSES[todo.priority] || PRIORITY_CLASSES.Low;
  const formattedDueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString()
    : '';

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim() === '') return;
    editTodo({
      ...todo,
      title: editTitle.trim(),
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate).toISOString() : null
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className={`todo-item editing`} aria-label={`edit-todo-${todo.title}`}>
        <form className="todo-edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="todo-input"
            required
          />
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            className="todo-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={e => setEditDueDate(e.target.value)}
            className="todo-date"
          />
          <button type="submit" className="todo-button">Save</button>
          <button type="button" className="todo-button cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`} aria-label={`todo-${todo.title}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`toggle ${todo.title}`}
      />
      <span className={`priority-indicator ${priorityClass}`} aria-label={`priority ${todo.priority}`}></span>
      <span className="todo-title">{todo.title}</span>
      {formattedDueDate && (
        <span className="todo-due-date" aria-label={`due date ${formattedDueDate}`}>
          Due: {formattedDueDate}
        </span>
      )}
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} aria-label={`edit ${todo.title}`}>✏️</button>
        <button onClick={() => deleteTodo(todo.id)} aria-label={`delete ${todo.title}`}>🗑️</button>
      </div>
    </li>
  );
};

export default TodoItem;
