const priorityColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green'
  };
  
  const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          className={`title ${todo.completed ? 'completed' : ''}`}
          style={{
            borderLeft: `4px solid ${priorityColors[todo.priority]}`,
            paddingLeft: '8px'
          }}
        >
          {todo.title}
        </span>
        <span className="priority-tag" style={{ color: priorityColors[todo.priority] }}>
          {todo.priority}
        </span>
        <button onClick={() => deleteTodo(todo.id)}>❌</button>
      </li>
    );
  };
  
  export default TodoItem;