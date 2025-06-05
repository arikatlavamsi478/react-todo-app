import { render, screen } from '@testing-library/react';
import TodoStats from '../components/TodoStat/TodoStats';

describe('TodoStats', () => {
  const mockTodos = [
    { id: '1', title: 'Todo 1', completed: false, priority: 'High' },
    { id: '2', title: 'Todo 2', completed: true, priority: 'Medium' }
  ];

  test('displays correct statistics', () => {
    render(<TodoStats todos={mockTodos} />);
    
    expect(screen.getByText(/total: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/active: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/completed: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/top priority task: todo 1/i)).toBeInTheDocument();
  });

  test('handles empty todos', () => {
    render(<TodoStats todos={[]} />);
    
    expect(screen.getByText(/total: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/top priority task: n\/a/i)).toBeInTheDocument();
  });
});
