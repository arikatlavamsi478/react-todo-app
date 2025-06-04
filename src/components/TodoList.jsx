import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
    if (todos.length === 0) {
      return <p style={{ textAlign: 'center', marginTop: '20px' }}>No todos available</p>;
    }
  
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              borderLeft: `4px solid ${
                todo.priority === 'High' ? 'red' : todo.priority === 'Medium' ? 'orange' : 'green'
              }`,
              padding: '8px',
              margin: '6px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
        
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ flexGrow: 1, cursor: 'pointer', userSelect: 'none' }}
            >
              {todo.title}
            </span>
  
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginLeft: '10px',
                userSelect: 'none',
              }}
              aria-label={`Delete todo ${todo.title}`}
              title="Delete todo"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }  

export default TodoList;
