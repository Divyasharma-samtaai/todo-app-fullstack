import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

export default function TodoItem({ todo, onDelete, onToggle }: TodoItemProps) {
  return (
    <div>
      <li className={todo.completed ? "todo-item completed" : "todo-item"}>
        <span
          className={`todo-text ${todo.completed ? "completed" : ""}`}
          onClick={() => onToggle(todo)}
        >
          {todo.title}
        </span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    </div>
  );
}
