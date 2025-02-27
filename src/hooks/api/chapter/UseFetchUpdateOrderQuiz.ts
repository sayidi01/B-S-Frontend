import { useCallback } from "react";
import { useUserContext } from "../../../config/UserContext";

export default function UseFetchUpdateOrderQuiz() {
  const { chapterApiClient } = useUserContext();

  const updateOrderQuiz = useCallback(
    async (
      courseId: string,
      chapterID: string,
      quizID: string,
      orderQuiz: number
    ) => {
      try {
        const response = await chapterApiClient.updateOrderQuiz(
          courseId,
          chapterID,
          quizID,
          orderQuiz
        );
        console.log(response);
        console.log("Quiz order update successfuly");
      } catch (error) {
        console.log("error", error);
      }
    },
    [chapterApiClient]
  );

  return { updateOrderQuiz };
}
