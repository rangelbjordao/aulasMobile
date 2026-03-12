import axios from "axios"

const api = axios.create({
  baseURL: "http://10.3.33.16:3000"
})

export default api