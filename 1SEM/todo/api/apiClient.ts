import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-app-92fk.onrender.com/api",
  timeout: 1_000,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  },
});

export { apiClient };
