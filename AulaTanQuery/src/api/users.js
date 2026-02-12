import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get(
    "https://698ddafbb79d1c928ed6c701.mockapi.io/users",
  );
  return response.data; //Retorna os dados (array de usuarios)
};
