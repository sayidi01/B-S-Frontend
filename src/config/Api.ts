import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "http://learn-bs-institute.com/api/v1/"
    : "http://localhost:3000/api/v1/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
