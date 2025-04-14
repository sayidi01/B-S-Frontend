
import { ICourse } from "../../../../../types/course";


export type QuizItem = 
  | { id: string; type: 'blank';  correctOption: string; options: string[] }
  | { id: string; type: 'phrase'; text: string };
export interface QuizQuestion {
  _id: string;
  type: string;
  question: string;
  options?: {
    _id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  matchingPairs?: {
    left: string;
    right: string;
  }[];
  items?: QuizItem[]; 
}

export interface CreateQuizData {
  questions: QuizQuestion[];
  name: string;
}

export interface UpdateQuizdata {
  questions: QuizQuestion[];
  name: string;
  courseId: string;
}

export interface IQuiz {
  name: string;
  courseId: string;
  _id: string;
  type: string;
  questions: QuizQuestion[];
  options?: {
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  matchingPairs?: {
    left: string;
    right: string;
  }[];
  createdAt: string;

  courseID: string;

 
  courseDetails: ICourse;
 
}
