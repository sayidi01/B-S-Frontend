export interface QuizQuestion {
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
  
    type: string;
    questions: QuizQuestion[];
  }