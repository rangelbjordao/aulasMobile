import { ApiKey } from "@/types/todo";
import { apiClient } from "./apiClient";

export async function postKey(studentId: string, secret: string) {
  const requestBody = {
    student_id: studentId,
    secret,
  };

  const response = await apiClient.post<ApiKey>("/keys", requestBody);

  return response.data;
}
