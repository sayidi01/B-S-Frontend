
import { ICourse } from "../../../../../types/course";


export type QuizItem = 
  | { id: string; type: 'blank';  correctOption: string; options: string[] }
  | { id: string; type: 'text'; text: string };

export enum QuizQuestionType {
  TRUE_FASLE = "true_false",
  MULTIPLE_CHOICE = "multiple_choice",
  SINGLE_CHOICE = "single_choice",
  MATCHING = "matching",
  SHORT_ANSWER = "short_answer",
  FILL_IN_THE_BLANK = "fill_in_the_blank",
  TEXT_WITH_QUESTIONS = "text_with_questions",
  GRAMMAR_QUIZ = "grammar_quiz",
}

export interface QuizQuestion {
  _id: string;
  type: QuizQuestionType;
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
  fillTheBlank?: QuizItem[]; 
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
