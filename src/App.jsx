import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoStats from './components/TodoStat/TodoStats';
import { useTodos } from './hooks/useTodos';

function App() {
  // Use the custom hook for all todo logic/state
  const {
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
  } = useTodos();

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Controls */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Creation Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Stats, Form, and List */}
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
