export interface Greeting {
  greeting: string;
}

export interface ApiKey {
  api_key: string;
}

export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
  note: string;
  tags: string[];
  created_at: string;
}

export type NewTodoItem = Omit<TodoItem, "id" | "completed" | "created_at">;

// export interface NewTodoItem {
//   name: string;
//   note: string;
//   tags: string[];
// }
