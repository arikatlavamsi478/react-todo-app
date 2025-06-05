import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList/TodoList';

jest.mock('../components/TodoItem/TodoItem', () => ({ todo }) => <div>{todo.title}</div>);

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', title: 'Todo 1' },
    { id: '2', title: 'Todo 2' }
  ];

  test('renders list of todos', () => {
    render(<TodoList todos={mockTodos} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  test('shows empty state message', () => {
    render(<TodoList todos={[]} />);
    
    expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
