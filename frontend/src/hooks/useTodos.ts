import { useEffect, useState } from "react";
import type { Todo } from "../types/Todo";
import { api } from "../services/Api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await api.getTodos();
        setTodos(data);
      } catch {
        setError("Failed to fetch todos.");
      }
    };

    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (title: string) => {
    try {
      setError(null);
      const newTodo = await api.createTodo({
        title,
        completed: false,
      });
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      setError("Failed to add todo.");
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo.");
    }
  };

  // Toggle todo
  const toggleTodo = async (todo: Todo) => {
    try {
      const updated = await api.updateTodo(todo.id, {
        title: todo.title,
        completed: !todo.completed,
      });

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch {
      setError("Failed to update todo.");
    }
  };

  return {
    todos,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
}
