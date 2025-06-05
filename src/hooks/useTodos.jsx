import { useState, useEffect } from 'react';

// Initial todos
const initialTodos = [
  {
    id: 1,
    title: 'Learn React Hooks',
    completed: false,
    priority: 'High',
    createdAt: new Date().toISOString(),
    dueDate: null,
  },
  {
    id: 2,
    title: 'Complete practice project',
    completed: true,
    priority: 'Medium',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    dueDate: null,
  },
];
 
export function useTodos() {
  // State
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  // Persist todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Keyboard shortcut: Ctrl/Cmd + N
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const newTodo = {
          title: 'New Todo',
          priority: 'Medium',
          id: Date.now(),
          completed: false,
          createdAt: new Date().toISOString(),
          dueDate: null,
        };
        setTodos((prev) => [...prev, newTodo]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CRUD operations
  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        ...todo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: todo.dueDate || null,
      },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, updatedFields) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  // Filtering and sorting
  const getFilteredTodos = () => {
    const filtered = todos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter((todo) => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      });

    return filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const p = { Low: 1, Medium: 2, High: 3 };
        return p[b.priority] - p[a.priority];
      } else if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  };

  // Return everything needed in App
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    getFilteredTodos,
  };
}
