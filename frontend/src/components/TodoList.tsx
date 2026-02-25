import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

export default function TodoList({ todos, onDelete, onToggle }: TodoListProps) {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
