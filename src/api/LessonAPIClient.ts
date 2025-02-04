import APIClient from ".";

export class LessonAPIClient extends APIClient {
  async createLesson(
    courseId: string,
    chapterId: string,
    title: string,
    description: string
  ) {
    return (
      await this.axiosInstance.post(
        `/course/${courseId}/chapters/${chapterId}/lessons`,
        { title, description, chapterId, courseId }
      )
    ).data;
  }

  async getAllLessonByCourse (courseId: string) {
    return(
      await this.axiosInstance.get(`/lessons/course/${courseId}`) 
    ).data;
  }

  async getLessonById(lessonId: string) {
    return(
      await this.axiosInstance.get(`/lessons/${lessonId}`)
    ).data;
  }

  async deleteLesson(lessonId: string) {
    return(
      await this.axiosInstance.delete(`/lessons/${lessonId}`)
    ).data;
  }
  
  async updateLesson(
    lessonId: string,
    data: Partial<{ title: string; description: string; content: string; courseId: string; chapterId: string }>
  ) {
    return await this.axiosInstance.put(`/lessons/${lessonId}`, data);
  }
}
