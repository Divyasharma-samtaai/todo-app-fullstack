import { useEffect, useState } from "react";
import type { Todo } from "./types/Todo";
import { api } from "./services/Api";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await api.getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await api.updateTodo(todo.id, {
        title: todo.title,
        completed: !todo.completed,
      });

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleAdd = async (title: string) => {
    try {
      setError(null);

      const newTodo = await api.createTodo({
        title,
        completed: false,
      });

      setTodos((prev) => [...prev, newTodo]);
    } catch {
      setError("Failed to add todo. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>

      {error && <p className="error-message">{error}</p>}

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
};

export default App;
