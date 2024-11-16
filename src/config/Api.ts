import axios from "axios";

const isProd = import.meta.env.MODE === "production";

export const baseURL = isProd
  ? "http://learn-bs-institute.com/api/v1/"
  : "http://localhost:3000/api/v1/";

export const imageURL = isProd
? "http://learn-bs-institute.com/"
: "http://localhost:3000/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
