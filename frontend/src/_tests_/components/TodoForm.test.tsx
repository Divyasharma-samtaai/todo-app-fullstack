import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import TodoForm from "../../components/TodoForm";

describe("TodoForm Component", () => {
  // ----------------------------------
  // 1. Should render input & button
  // ----------------------------------
  test("renders input and submit button", () => {
    render(<TodoForm onAdd={vi.fn()} />);

    expect(screen.getByPlaceholderText("Enter todo title")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  // ----------------------------------
  //  2. Should type into input
  // ----------------------------------
  test("updates input value when typing", () => {
    render(<TodoForm onAdd={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      "Enter todo title",
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "Learn Testing" },
    });

    expect(input.value).toBe("Learn Testing");
  });

  // ----------------------------------
  //  3. Should call onAdd on submit
  // ----------------------------------
  test("calls onAdd when form is submitted with valid input", () => {
    const mockAdd = vi.fn();

    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText("Enter todo title");
    const form = input.closest("form")!;

    fireEvent.change(input, {
      target: { value: "Learn React Testing" },
    });

    fireEvent.submit(form);

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith("Learn React Testing");
  });

  // ----------------------------------
  //  4. Should clear input after submit
  // ----------------------------------
  test("clears input after successful submit", () => {
    const mockAdd = vi.fn();

    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText(
      "Enter todo title",
    ) as HTMLInputElement;
    const form = input.closest("form")!;

    fireEvent.change(input, {
      target: { value: "Clear me" },
    });

    fireEvent.submit(form);

    expect(input.value).toBe("");
  });

  // ----------------------------------
  //  5. Should NOT submit empty input
  // ----------------------------------
  test("does not call onAdd when input is empty", () => {
    const mockAdd = vi.fn();

    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText("Enter todo title");
    const form = input.closest("form")!;

    fireEvent.change(input, {
      target: { value: "   " }, // only spaces
    });

    fireEvent.submit(form);

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
