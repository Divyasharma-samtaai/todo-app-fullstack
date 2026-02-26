import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import TodoItem from "../../components/TodoItem";
import type { Todo } from "../../types/Todo";

describe("TodoItem Component", () => {
  const mockTodo: Todo = {
    id: 1,
    title: "Learn Testing",
    completed: false,
  };

  // ----------------------------------
  // ✅ 1. Renders todo title
  // ----------------------------------
  test("renders todo title", () => {
    render(<TodoItem todo={mockTodo} onDelete={vi.fn()} onToggle={vi.fn()} />);

    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
  });

  // ----------------------------------
  // ✅ 2. Calls onToggle when text is clicked
  // ----------------------------------
  test("calls onToggle when todo text is clicked", () => {
    const mockToggle = vi.fn();

    render(
      <TodoItem todo={mockTodo} onDelete={vi.fn()} onToggle={mockToggle} />,
    );

    fireEvent.click(screen.getByText("Learn Testing"));

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockTodo);
  });

  // ----------------------------------
  // ✅ 3. Calls onDelete when delete button is clicked
  // ----------------------------------
  test("calls onDelete when delete button is clicked", () => {
    const mockDelete = vi.fn();

    render(
      <TodoItem todo={mockTodo} onDelete={mockDelete} onToggle={vi.fn()} />,
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  // ----------------------------------
  // ✅ 4. Applies completed class when todo is completed
  // ----------------------------------
  test("applies completed class when todo is completed", () => {
    const completedTodo: Todo = {
      ...mockTodo,
      completed: true,
    };

    render(
      <TodoItem todo={completedTodo} onDelete={vi.fn()} onToggle={vi.fn()} />,
    );

    const listItem = screen.getByText("Learn Testing").closest("li");

    expect(listItem).toHaveClass("completed");
  });
});
