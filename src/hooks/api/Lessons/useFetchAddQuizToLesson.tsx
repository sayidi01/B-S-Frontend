import { useCallback, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import toast from "react-hot-toast";
import { ILesson } from "../../../components/Admins/Course/Edit/Lessons/TypesLessons";
import { C } from "@fullcalendar/core/internal-common";

export default function useFetchAddQuizToLesson() {
  const { lessonAPIClient } = useUserContext();

  const [lessonWithQuiz, setLessonWithQuiz] = useState<ILesson[]>([]);

  console.log(lessonWithQuiz, "hey");

  const addQuizToLesson = useCallback(
    async (lessonId: string, quizId: string) => {
      try {
        const response = await lessonAPIClient.addedQuizToLesson(
          lessonId,
          quizId
        );
        toast.success("Quiz added to lesson successfuly");
        return response;
      } catch (error) {
        console.log(error, "error");
        toast.error("Failed to add quiz to lesson");
        throw error;
      }
    },
    [lessonAPIClient]
  );

  return { addQuizToLesson };
}
