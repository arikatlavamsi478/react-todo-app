import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

/**
 * TodoList component renders a list of todos using TodoItem.
 * Props:
 * - todos: array of todo objects
 * - toggleTodo: function to toggle a todo's completed status
 * - deleteTodo: function to delete a todo
 * - editTodo: optional function to edit a todo
 * - showCreatedAt: boolean to show creation date (currently unused)
 */

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  if (todos.length === 0) {
    return <p className="todo-list-empty">No todos available</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;

