import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";

export interface ICourse {
  data: {
    quizzes: IQuiz[]
  }
  createdAt: string;
  title: string;
  updatedAt: string;
  url: string;
  _id: string;
  imageCourse: string
  description: string
  content?: string
  
}
