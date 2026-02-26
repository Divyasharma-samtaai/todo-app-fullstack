import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { useTodos } from "../../hooks/useTodos";
import { api } from "../../services/Api";
import type { Todo } from "../../types/Todo";

// ✅ Mock API module
vi.mock("../../services/Api", () => ({
  api: {
    getTodos: vi.fn(),
    createTodo: vi.fn(),
    deleteTodo: vi.fn(),
    updateTodo: vi.fn(),
  },
}));

describe("useTodos Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -----------------------------
  // ✅ Fetch Todos on Mount
  // -----------------------------
  test("should fetch todos on mount", async () => {
    const mockTodos: Todo[] = [
      { id: 1, title: "Learn React", completed: false },
    ];

    (api.getTodos as any).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos.length).toBe(1);
    });

    expect(result.current.todos).toEqual(mockTodos);
    expect(api.getTodos).toHaveBeenCalledTimes(1);
  });

  // -----------------------------
  // ✅ Add Todo
  // -----------------------------
  test("should add a new todo", async () => {
    const newTodo: Todo = {
      id: 2,
      title: "Write Tests",
      completed: false,
    };

    (api.getTodos as any).mockResolvedValue([]);
    (api.createTodo as any).mockResolvedValue(newTodo);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {});

    await act(async () => {
      await result.current.addTodo("Write Tests");
    });

    expect(api.createTodo).toHaveBeenCalledWith({
      title: "Write Tests",
      completed: false,
    });

    expect(result.current.todos).toContainEqual(newTodo);
  });

  // -----------------------------
  // ✅ Delete Todo
  // -----------------------------
  test("should delete a todo", async () => {
    const mockTodos: Todo[] = [
      { id: 1, title: "Learn React", completed: false },
    ];

    (api.getTodos as any).mockResolvedValue(mockTodos);
    (api.deleteTodo as any).mockResolvedValue({});

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos.length).toBe(1);
    });

    await act(async () => {
      await result.current.deleteTodo(1);
    });

    expect(api.deleteTodo).toHaveBeenCalledWith(1);
    expect(result.current.todos.length).toBe(0);
  });

  // -----------------------------
  // ✅ Toggle Todo
  // -----------------------------
  test("should toggle a todo", async () => {
    const mockTodo: Todo = {
      id: 1,
      title: "Learn React",
      completed: false,
    };

    const updatedTodo: Todo = {
      ...mockTodo,
      completed: true,
    };

    (api.getTodos as any).mockResolvedValue([mockTodo]);
    (api.updateTodo as any).mockResolvedValue(updatedTodo);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos.length).toBe(1);
    });

    await act(async () => {
      await result.current.toggleTodo(mockTodo);
    });

    expect(api.updateTodo).toHaveBeenCalledWith(1, {
      title: "Learn React",
      completed: true,
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  // -----------------------------
  // ❌ Fetch Error Handling
  // -----------------------------
  test("should set error if fetching todos fails", async () => {
    (api.getTodos as any).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch todos.");
    });

    expect(result.current.todos.length).toBe(0);
  });

  // -----------------------------
  // ❌ Add Todo Error Handling
  // -----------------------------
  test("should set error if adding todo fails", async () => {
    (api.getTodos as any).mockResolvedValue([]);
    (api.createTodo as any).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {});

    await act(async () => {
      await result.current.addTodo("Test");
    });

    expect(result.current.error).toBe("Failed to add todo.");
  });
});
