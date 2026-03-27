import { Greeting } from "@/types/todo";
import { apiClient } from "./apiClient";

export async function getGreeting() {
  const response = await apiClient.get<Greeting>("/greeting");

  return response.data;
}
