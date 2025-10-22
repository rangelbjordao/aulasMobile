import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-app-92fk.onrender.com/api",
  headers: {
    "x-api-key": "asomesecretkeys",
  },
});

export { apiClient };
