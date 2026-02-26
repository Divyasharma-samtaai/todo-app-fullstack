import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import TodoList from "../../components/TodoList";
import type { Todo } from "../../types/Todo";

// ✅ Mock TodoItem component
vi.mock("../../components/TodoItem", () => ({
  default: ({ todo }: { todo: Todo }) => (
    <li data-testid="mock-todo-item">{todo.title}</li>
  ),
}));

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Write Tests", completed: true },
  ];

  // ----------------------------------
  // ✅ 1. Renders heading
  // ----------------------------------
  test("renders Todo List heading", () => {
    render(<TodoList todos={[]} onDelete={vi.fn()} onToggle={vi.fn()} />);

    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  // ----------------------------------
  // ✅ 2. Shows message when no todos
  // ----------------------------------
  test("shows 'No todos available' when list is empty", () => {
    render(<TodoList todos={[]} onDelete={vi.fn()} onToggle={vi.fn()} />);

    expect(screen.getByText("No todos available.")).toBeInTheDocument();
  });

  // ----------------------------------
  // ✅ 3. Renders list of todos
  // ----------------------------------
  test("renders TodoItem components when todos exist", () => {
    render(
      <TodoList todos={mockTodos} onDelete={vi.fn()} onToggle={vi.fn()} />,
    );

    const items = screen.getAllByTestId("mock-todo-item");

    expect(items.length).toBe(2);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });
});
