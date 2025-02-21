import React, { useEffect, useState } from "react";
import {
  IQuiz,
  QuizQuestion,
} from "../../../components/Admins/Course/Edit/Quiz/quiz.types";

export default function useManageQuiz(initialQuizData: IQuiz | null) {
  const [quiz, setQuiz] = useState<IQuiz | null>(initialQuizData);

  useEffect(() => {
    if (initialQuizData && !quiz) setQuiz(initialQuizData);
  }, [initialQuizData]);

  const addQuestion = (question: QuizQuestion) => {
    setQuiz((prev) =>
      !prev
        ? null
        : {
            ...prev,
            questions: [...prev.questions, question],
          }
    );
  };

  const updateQuestion = (questionID: string, newData: QuizQuestion) => {
    setQuiz((prev) => {
      if (!prev) return null;
      const updatedQuestions = prev.questions.map((question) =>
        question._id === questionID ? newData : question
      );
      return { ...prev, questions: updatedQuestions };
    });
  };

  const removeQuestion = (questionID: string) => {
    setQuiz((prev) => {
      if (!prev) return null;

      const updatedQuestions = prev.questions.filter(
        (question) => question._id != questionID
      );
      return { ...prev, questions: updatedQuestions };
    });
  };

  const updateQuizName = (newName: string) => {
    setQuiz((prev) => (!prev ? null : { ...prev, name: newName }));
  };

  return {
    quiz,
    methods: { addQuestion, updateQuestion, removeQuestion, updateQuizName },
  };
}
