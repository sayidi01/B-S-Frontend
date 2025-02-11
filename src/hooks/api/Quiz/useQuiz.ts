import {  useCallback, useState } from "react";


import { CreateQuizData, QuizQuestion } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { useUserContext } from "../../../config/UserContext";


interface UseQuizReturn {
    quizData: CreateQuizData;
    loading: boolean;
    error: string | null;
    setQuizData: React.Dispatch<React.SetStateAction<CreateQuizData>>
    addQuestion: (question: QuizQuestion) => void;
    removeQuestion: (index: number) => void;
    updateQuizType: (type: string) => void;
    createQuiz: (courseId: string) => Promise<any>;
  }


  const useQuiz = () : UseQuizReturn => {

    const {quizAPIClient } = useUserContext();

    const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    

    const [quizData, setQuizData] = useState<CreateQuizData>({
        type: "",
        questions: [],
      });


      const addQuestion = (question: QuizQuestion) => {
        setQuizData((prev) => ({
          ...prev,
          questions: [...prev.questions, question],
        }));
      };
    
      const removeQuestion = (index: number) => {
        setQuizData((prev) => {
          const updatedQuestions = [...prev.questions];
          updatedQuestions.splice(index, 1);
          return { ...prev, questions: updatedQuestions };
        });
      };

      const updateQuizType = (type: string) => {
        setQuizData((prev) => ({ ...prev, type }));
      };
    
      const createQuiz = useCallback(async (courseId: string) => {
        setLoading(true);
        setError(null);
        try {
          const response = await quizAPIClient .createQuiz(courseId, quizData);
          console.log("Quiz created successfully:", response);
          return response;
        } catch (err: any) {
          setError(err.message || "Failed to create quiz");
        } finally {
          setLoading(false);
        }
      }, [quizData]);

      return {
        quizData,
        loading,
        error,
        addQuestion,
        removeQuestion,
        updateQuizType,
        createQuiz,
        setQuizData
      };
      
  }
  export default useQuiz;