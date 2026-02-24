import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <li>{todo.title}</li>
    </div>
  );
}
