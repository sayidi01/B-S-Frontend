import axios from "axios";
import { baseURL } from "../config/Api";

export default class APIClient {
  public readonly axiosInstance: Axios.AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
