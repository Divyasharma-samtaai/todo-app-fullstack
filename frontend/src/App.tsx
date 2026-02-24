import { useEffect, useState } from "react";
import type { Todo } from "./types/Todo";
import { api } from "./services/Api";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <div>
      <h1>Todo App</h1>
      <h1>Todo Count: {todos.length}</h1>
    </div>
  );
};

export default App;
