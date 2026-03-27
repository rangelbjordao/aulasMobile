import { NewTodoItem, TodoItem } from "@/types/todo";
import { apiClient } from "./apiClient";

export async function getTodoItems(): Promise<TodoItem[]> {
  const response = await apiClient.get<TodoItem[]>("/items");

  return response.data;
}

export async function postTodoItem(newItem: NewTodoItem): Promise<TodoItem> {
  const response = await apiClient.post<TodoItem>("/items", newItem);

  return response.data;
}

export async function putTodoItem(params: {
  id: string;
  name: string;
  completed: boolean;
}): Promise<TodoItem> {
  const { id, ...body } = params;

  const response = await apiClient.post<TodoItem>(`/items/${id}`, body);

  return response.data;
}

export async function deleteTodoItem(id: string) {
  await apiClient.delete(`/items/${id}`);
}
