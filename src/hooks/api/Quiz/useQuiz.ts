import { useCallback, useState } from "react";

import {
  CreateQuizData,
  QuizQuestion,
} from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { useUserContext } from "../../../config/UserContext";

import { useQueryClient } from "@tanstack/react-query";

interface CreateQuizResponse {
  data: {
    quiz: CreateQuizData;
  };
}

interface UseQuizReturn {
  quizData: CreateQuizData;
  loading: boolean;
  error: string | null;
  addQuestion: (question: QuizQuestion) => void;
  removeQuestion: (index: number) => void;
  createQuiz: (courseId: string) => Promise<any>;
  updateQuestion: (questionID: string, newData: QuizQuestion) => void;
  handleNameChange: (newName: string) => void;

 
}

const useQuiz = (): UseQuizReturn => {
  const { quizAPIClient } = useUserContext();
  
  const queryClient = useQueryClient(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quizData, setQuizData] = useState<CreateQuizData>({
    questions: [],
    name: ""
  });

  const addQuestion = (question: QuizQuestion) => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const updateQuestion = (questionID: string, newData: QuizQuestion) => {
    setQuizData((prev) => {
      const updatedQuestions = prev.questions.map((question) =>
        question._id === questionID ? newData : question
      );
      return { ...prev, questions: updatedQuestions };
    });
  };

  const removeQuestion = (index: number) => {
    setQuizData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions.splice(index, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleNameChange = (newName: string) => {
    setQuizData((prev) => ({ ...prev, name: newName }));
  };

  
 

  const createQuiz = useCallback(
    async (courseId: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = (await quizAPIClient.createQuiz(
          courseId,
          quizData
        )) as CreateQuizResponse;
        
        setQuizData((prev) => ({
          ...prev,
          ...response.data.quiz,
        }));
        await queryClient.refetchQueries({
          queryKey: ["courseData", courseId],
        });
       
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to create quiz");
      } finally {
        setLoading(false);
      }
    },
    [quizData]
  );

  return {
    quizData,
    loading,
    error,
    addQuestion,
    removeQuestion,
    createQuiz,
    updateQuestion,
    handleNameChange,
    

  };
};
export default useQuiz;
