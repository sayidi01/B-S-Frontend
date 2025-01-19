import APIClient from ".";

export default class CourseAPIClient extends APIClient {
  async getCourseData(id: string) {
    return (await this.axiosInstance.get(`/course/${id}`)).data;
  }

  async updateCourseContent(id: string, content: string) {
    return (await this.axiosInstance.put(`/course/${id}`, { content })).data;
  }
}
