import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todo App', () => {
    test('renders app title', () => {
      render(<App />);
      expect(screen.getByText(/todo app/i)).toBeInTheDocument();
    });
  
    test('adds new todo item', () => {
      render(<App />);
      const input = screen.getByPlaceholderText(/todo title/i);
      const button = screen.getByText(/add todo/i);
  
      fireEvent.change(input, { target: { value: 'Test Todo' } });
      fireEvent.click(button);
  
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  
    test('marks todo as completed', () => {
      render(<App />);
      const input = screen.getByPlaceholderText(/todo title/i);
      fireEvent.change(input, { target: { value: 'Complete Me' } });
      fireEvent.click(screen.getByText(/add todo/i));
  
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });
  