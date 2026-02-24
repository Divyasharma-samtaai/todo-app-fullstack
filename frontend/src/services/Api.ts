// create api file to call backend api using axios for todos and export the functions to be used in components
import axios from "axios";
import type { Todo } from "../types/Todo";

const API_BASE_URL = "http://localhost:8080";

export const api = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  },
  createTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  },
  updateTodo: async (id: number, todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo);
    return response.data;
  },
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  },
};
