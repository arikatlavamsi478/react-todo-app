import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';

const initialTodos = [
  {
    id: 1,
    title: "Learn React Hooks",
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString(),
    dueDate: null
  },
  {
    id: 2,
    title: "Complete practice project",
    completed: true,
    priority: "Medium",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    dueDate: null
  }
];

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
          dueDate: null
        };
        setTodos(prev => [...prev, newTodo]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: todo.dueDate || null
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updatedFields) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ));
  };

  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const p = { Low: 1, Medium: 2, High: 3 };
          return p[b.priority] - p[a.priority];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={getFilteredTodos()} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
        editTodo={editTodo}
        showCreatedAt={true} 
      />
    </div>
  );
}

export default App;