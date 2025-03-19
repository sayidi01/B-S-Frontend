import APIClient from ".";
import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";

interface IResponse {
  is_success: boolean;
  message: string;
  data: {
    lesson: ILesson;
  };
}
export class LessonAPIClient extends APIClient {
  async createLesson(
    courseId: string,
    chapterId: string,
    title: string,
    description: string
  ) {
    return (
      await this.axiosInstance.post(
        `/lessons`,
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
    return await this.axiosInstance.put<IResponse>(`/lessons/${lessonId}`, data);
  }

  async addedQuizToLesson(lessonId: string, quizId: string) {
    return ( await this.axiosInstance.post<IResponse>(`/lessons/${lessonId}/quiz`,{quizId})).data
  }
}
