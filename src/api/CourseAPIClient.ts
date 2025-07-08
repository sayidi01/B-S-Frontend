import APIClient from ".";

export default class CourseAPIClient extends APIClient {
  async getCourseData(id: string) {
    return (await this.axiosInstance.get(`/course/${id}`)).data;
  }

  async updateCourseContent(id: string, content: string) {
    return (await this.axiosInstance.put(`/course/${id}`, { content })).data;
  }

  async getAllQuizzesByCourse(courseID: string) {
    return(
        await this.axiosInstance.get(`/course/${courseID}/quiz`)
    ).data
}

  async getCourseProgressStudent(id: string, studentId: string) {
    return (await this.axiosInstance.get(`/course/${id}/progress?studentId=${studentId}`)).data
  }

}
