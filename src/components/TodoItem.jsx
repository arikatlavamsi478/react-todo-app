const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    const priorityClass = {
        Low: "priority-low",
        Medium: "priority-medium",
        High: "priority-high"
      }[todo.priority] || "priority-low";

return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
      />
      <span className={`priority-indicator ${priorityClass}`}></span>
      <span className="todo-title">{todo.title}</span>
      <div className="todo-actions">
        <button onClick={() => deleteTodo(todo.id)} aria-label="Delete todo">🗑️</button>
      </div>
    </li>
  );
};
  
  export default TodoItem;