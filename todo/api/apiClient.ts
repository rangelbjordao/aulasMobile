import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-app-with-user.onrender.com/api",
  headers: {
    "x-api-key": "asomesecretkeys",
  },
});

export { apiClient };
