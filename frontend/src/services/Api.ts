// create api file to call backend api using axios for todos and export the functions to be used in components
import axios from "axios";
import type { Todo } from "../types/Todo";

const BASE_URL = "http://localhost:8080/todos";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  async getTodos(): Promise<Todo[]> {
    const response = await axiosInstance.get("");
    return response.data;
  },

  async createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const response = await axiosInstance.post("", todo);
    return response.data; // VERY IMPORTANT
  },

  async deleteTodo(id: number): Promise<void> {
    await axiosInstance.delete(`/${id}`);
  },
};
