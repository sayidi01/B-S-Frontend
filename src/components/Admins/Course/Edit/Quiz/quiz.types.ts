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
}


export interface IQuiz {
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