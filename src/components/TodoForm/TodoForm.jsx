import React, { useState } from 'react';
import './TodoForm.css';

/**
 * TodoForm component allows user to input a new todo item with:
 * - title (required)
 * - priority (Low/Medium/High)
 * - due date (optional, must be today or future)
 *
 * On submission, a new todo object is passed to `addTodo` with:
 * - title, priority, createdAt, dueDate
 */

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') return;

    if (dueDate) {
      const due = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (due < today) {
        alert("Due date cannot be in the past.");
        return;
      }
    }

    addTodo({ 
      title: trimmedTitle, 
      priority, 
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      createdAt: new Date().toISOString()
    });

    setTitle('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="todo-form"
      aria-label="todo form"
    >
      <input
        type="text"
        placeholder="Add todo..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="title"
        required
        className="todo-input"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        aria-label="priority"
        className="todo-select"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        aria-label="due date"
        className="todo-date"
      />
      <button
        type="submit"
        aria-label="add todo"
        className="todo-button"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
