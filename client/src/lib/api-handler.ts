import axios from "axios"

const myApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})
myApi.interceptors.request.use((request) => {
  // Add token to request headers
  request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return request
})

export default myApi
