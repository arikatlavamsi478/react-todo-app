import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    addTodo({ title: title.trim(), priority });
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '20px',
      flexWrap: 'wrap',
    }}>
      <input
        type="text"
        placeholder="Add todo..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '200px',
          minWidth: '150px',
        }}
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" style={{
        padding: '8px 20px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
