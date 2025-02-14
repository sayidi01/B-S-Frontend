export interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  options?: {
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
  name: string
}


export interface IQuiz {
  name: string
  courseId: string
  _id: string;
  type: string;
  questions: string;
  options?: {
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  matchingPairs?: {
    left: string;
    right: string;
  }[];
  createdAt: string
}