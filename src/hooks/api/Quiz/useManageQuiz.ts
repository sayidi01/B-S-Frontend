import { useEffect, useState } from "react";
import {
  IQuiz,
  QuizQuestion,
  QuizQuestionType,
} from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { defaultQuestionPerType } from "./utils";
import { QueryClient } from "@tanstack/react-query";

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

  const updateQuestionType = (
    questionID: string,
    newType: QuizQuestionType
  ) => {
    const newQuestion: QuizQuestion = {
      _id: questionID,
      type: newType,
      question: "",
      options: [],
      correctAnswer: "",
      matchingPairs: [],
      fillTheBlank: [],
      ...defaultQuestionPerType[newType],
    };

    setQuiz((prev) => {
      if (!prev) return null;

      const updatedQuestions = prev.questions.map((question) =>
        question._id === questionID ? newQuestion : question
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
    methods: { addQuestion, updateQuestion, removeQuestion, updateQuizName, updateQuestionType },
  };
}
