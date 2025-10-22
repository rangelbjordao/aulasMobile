import { Post } from "@/types/post";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1_000,
  headers: {
    "X-App-Version": "1.0.0",
  },
});

export async function getPosts() {
  const response = await instance.get<Post[]>("/posts");

  return response.data;
}
