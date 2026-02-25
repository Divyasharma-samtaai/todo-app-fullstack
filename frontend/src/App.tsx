import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { useTodos } from "./hooks/useTodos";

const App = () => {
  const { todos, error, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>

      {error && <p className="error-message">{error}</p>}

      <TodoForm onAdd={addTodo} />

      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
};

export default App;
