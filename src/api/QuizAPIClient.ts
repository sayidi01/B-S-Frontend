import APIClient from ".";
import { CreateQuizData } from '../components/Admins/Course/Edit/Quiz/quiz.types';



export default class QuizAPIClient extends APIClient {
    async createQuiz( courseId: string,data: CreateQuizData) {
        return(
            await this.axiosInstance.post(`/quiz`, data,)
        ).data
    }
} 