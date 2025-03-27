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
}

export interface CreateQuizData {
  questions: QuizQuestion[];
  name: string;
}

export interface UpdateQuizdata {
  questions: QuizQuestion[];
  name: string;
  courseId: string
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
}
