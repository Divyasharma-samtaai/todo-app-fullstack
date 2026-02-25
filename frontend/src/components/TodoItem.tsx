import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <div>
      <li className={todo.completed ? "todo-item completed" : "todo-item"}>
        {todo.title}
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    </div>
  );
}
