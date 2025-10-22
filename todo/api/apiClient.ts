import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-app-92fk.onrender.com/api",
  timeout: 1_000,
  headers: {
    Authorization: "Bearer 1ca4ece2-9a9f-4ae6-9912-65c1bc26f5e2",
  },
});

export { apiClient };
