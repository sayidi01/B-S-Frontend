import { useCallback} from "react";
import { useUserContext } from "../../../config/UserContext";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useFetchAddQuizToLesson() {
  const { lessonAPIClient } = useUserContext();
  const queryClient = useQueryClient();
 

 const { id } = useParams();

  const addQuizToLesson = useCallback(
    async (lessonId: string, quizId: string) => {
      try {
        const response = await lessonAPIClient.addedQuizToLesson(
          lessonId,
          quizId
        );
        await queryClient.invalidateQueries({
          queryKey: ['courseData', id],
        });
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
