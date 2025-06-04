import React from 'react';

/**
 * TodoStats displays summary statistics of todos.
 *
 * Props:
 * - todos: array of todo objects
 *   - used to calculate total, active, and completed counts
 *   - also determines the top priority active todo
 */

function TodoStats({ todos }) {
  const total = todos.length;
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = todos.filter((todo) => todo.completed).length;

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const topPriorityTodo = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])[0];

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '1rem',
        color: '#333',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '500',
      }}
    >
      <div>Total: {total}</div>
      <div>Active: {active}</div>
      <div>Completed: {completed}</div>
      <div>
        Top Priority Task: {topPriorityTodo ? topPriorityTodo.title : 'N/A'}
      </div>
    </div>
  );
}

export default TodoStats;