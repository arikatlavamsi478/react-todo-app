import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem/TodoItem';

const mockTodo = {
  id: '1',
  title: 'Test Todo',
  completed: false,
  priority: 'Medium',
  dueDate: '2099-12-31T00:00:00Z'
};

describe('TodoItem', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();
  const mockEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} toggleTodo={mockToggle} deleteTodo={mockDelete} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delete/i)).toBeInTheDocument();
  });

  test('toggles completion status', () => {
    render(<TodoItem todo={mockTodo} toggleTodo={mockToggle} />);
    
    fireEvent.click(screen.getByLabelText(/toggle/i));
    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  test('deletes todo item', () => {
    render(<TodoItem todo={mockTodo} deleteTodo={mockDelete} />);
    
    fireEvent.click(screen.getByLabelText(/delete/i));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  test('enters edit mode', () => {
    render(<TodoItem todo={mockTodo} editTodo={mockEdit} />);
    
    fireEvent.click(screen.getByLabelText(/edit/i));
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});
