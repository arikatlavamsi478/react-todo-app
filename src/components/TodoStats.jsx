const TodoStats = ({ todos }) => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
  
    const highestPriorityTodo = todos
      .filter((t) => !t.completed)
      .sort((a, b) => {
        const map = { High: 3, Medium: 2, Low: 1 };
        return map[b.priority] - map[a.priority];
      })[0];
  
    return (
      <div className="todo-stats">
        <p>
          <strong>Total:</strong> {total} | <strong>Active:</strong> {active} |{' '}
          <strong>Completed:</strong> {completed}
        </p>
        {highestPriorityTodo && (
          <p>
            <strong>Top Priority Todo:</strong> {highestPriorityTodo.title} ({
              highestPriorityTodo.priority
            })
          </p>
        )}
      </div>
    );
  };
  
  export default TodoStats;