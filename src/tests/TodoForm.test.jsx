import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../components/TodoForm/TodoForm';

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders all form elements', () => {
    render(<TodoForm addTodo={jest.fn()} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('submits valid form data', () => {
    const mockAdd = jest.fn();
    render(<TodoForm addTodo={mockAdd} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2099-12-31' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Task',
      priority: 'High',
      dueDate: expect.any(String),
      createdAt: expect.any(String)
    }));
  });

  test('prevents submission with empty title', () => {
    const mockAdd = jest.fn();
    render(<TodoForm addTodo={mockAdd} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test('shows alert for past due dates', () => {
    render(<TodoForm addTodo={jest.fn()} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    expect(window.alert).toHaveBeenCalledWith('Due date cannot be in the past.');
  });
});
