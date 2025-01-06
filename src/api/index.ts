import axios from "axios";
import { baseURL } from "../config/Api";

export default class APIClient {
  private readonly axiosInstance: Axios.AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getCourseData(id: string) {
    return (await this.axiosInstance.get(`/course/${id}`)).data;
  }

  async updateCourseContent(id: string, content: string) {
    return (await this.axiosInstance.put(`/course/${id}`, { content })).data;
  }
}
