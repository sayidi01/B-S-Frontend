import APIClient from ".";
import {
  CreateQuizData,
  IQuiz,
  UpdateQuizdata,
} from "../components/Admins/Course/Edit/Quiz/quiz.types";

export default class QuizAPIClient extends APIClient {
  async createQuiz(courseId: string, data: CreateQuizData) {
    return (await this.axiosInstance.post(`/quiz`, { ...data, courseId })).data;
  }

  async getSingleQuizById(quizID: string) {
    return (await this.axiosInstance.get(`/quiz/${quizID}`)).data;
  }

  async deleteQuizById(quizID: string) {
    return await this.axiosInstance.delete(`/quiz/${quizID}`);
  }

  async updateQuiz(quizID: string, data: UpdateQuizdata) {
    return ((await this.axiosInstance.put(`/quiz/${quizID}`, data)).data as any)
      .data.quiz as IQuiz;
  }
}
