import { act, renderHook } from '@testing-library/react-hooks';
import { useTodos } from './useTodos';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useTodos hook', () => {
  it('should initialize with initialTodos if localStorage is empty', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos.length).toBe(2);
    expect(result.current.todos[0].title).toBe('Learn React Hooks');
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo({ title: 'Test Todo', priority: 'High' });
    });
    expect(result.current.todos.some(t => t.title === 'Test Todo')).toBe(true);
  });

  it('should toggle a todo', () => {
    const { result } = renderHook(() => useTodos());
    const id = result.current.todos[0].id;
    act(() => {
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(true);
    act(() => {
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());
    const id = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(id);
    });
    expect(result.current.todos.find(t => t.id === id)).toBeUndefined();
  });

  it('should edit a todo', () => {
    const { result } = renderHook(() => useTodos());
    const id = result.current.todos[0].id;
    act(() => {
      result.current.editTodo(id, { title: 'Updated Title', priority: 'Low', dueDate: '2025-06-10' });
    });
    expect(result.current.todos[0].title).toBe('Updated Title');
    expect(result.current.todos[0].priority).toBe('Low');
    expect(result.current.todos[0].dueDate).toBe('2025-06-10');
  });

  it('should filter active todos', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setFilter('active');
    });
    const filtered = result.current.getFilteredTodos();
    expect(filtered.every(t => !t.completed)).toBe(true);
  });

  it('should filter completed todos', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setFilter('completed');
    });
    const filtered = result.current.getFilteredTodos();
    expect(filtered.every(t => t.completed)).toBe(true);
  });

  it('should filter by priority', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setPriorityFilter('High');
    });
    const filtered = result.current.getFilteredTodos();
    expect(filtered.every(t => t.priority === 'High')).toBe(true);
  });

  it('should sort by priority', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setSortBy('priority');
    });
    const filtered = result.current.getFilteredTodos();

    expect(filtered[0].priority).toBe('High');
  });

  it('should sort by createdAt', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setSortBy('createdAt');
    });
    const filtered = result.current.getFilteredTodos();

    expect(new Date(filtered[0].createdAt) >= new Date(filtered[1].createdAt)).toBe(true);
  });
});
