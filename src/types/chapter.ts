import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";

export interface IChapter {
  [x: string]: any;
  _id: string;
  title: string;
  courseId: string;
  quizzes: {
    _id: string
    quizId?: { 
      _id: string;
      name: string;
  } | null;
    name: string; 
    orderQuiz: number;
    lessons?: ILesson[]
    quizzes?: IQuiz[];
  }[];
}
