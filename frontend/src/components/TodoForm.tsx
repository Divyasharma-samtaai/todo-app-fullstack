import { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd(title);
    setTitle("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  );
}
