import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Todo App', () => {
  beforeEach(() => {
    localStorage.clear();
  });


  const getTodoList = () => screen.getByRole('list');

  test('adds a new todo via form', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add todo/i);
    const prioritySelect = screen.getByRole('combobox', { name: /priority/i });
    const addButton = screen.getByRole('button', { name: /add todo/i });

    await userEvent.type(input, 'Test new todo');
    await userEvent.selectOptions(prioritySelect, 'Low');
    await userEvent.click(addButton);

    expect(await within(getTodoList()).findByText('Test new todo')).toBeInTheDocument();
  });

  test('toggles todo completed status', async () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { 
      name: /toggle Learn React Hooks/i 
    });
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('deletes a todo', async () => {
    render(<App />);
    const deleteButton = screen.getByRole('button', { 
      name: /delete Learn React Hooks/i 
    });
    await userEvent.click(deleteButton);
    expect(screen.queryByRole('listitem', { 
      name: /todo-Learn React Hooks/i 
    })).toBeNull();
  });
  
  test('sorts todos by createdAt and priority', async () => {
    render(<App />);
  
    const comboboxes = screen.getAllByRole('combobox');
    const sortSelect = comboboxes[2];
    
    let todoItems = within(getTodoList()).getAllByRole('listitem');
    expect(todoItems[0]).toHaveAttribute(
      'aria-label',
      'todo-Learn React Hooks'
    );

    await userEvent.selectOptions(sortSelect, 'priority');
    todoItems = within(getTodoList()).getAllByRole('listitem');
    expect(todoItems[0]).toHaveAttribute(
      'aria-label',
      'todo-Learn React Hooks'
    );
  });

  test('persists todos in localStorage', () => {
    render(<App />);
    const todos = JSON.parse(localStorage.getItem('todos'));
    expect(todos).toHaveLength(2);
    expect(todos.some(todo => todo.title === 'Learn React Hooks')).toBe(true);
  });
});
