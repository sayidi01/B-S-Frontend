import { useCallback, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IQuiz } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { useCourse } from "../../../components/Admins/SingleCourse";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function UseFetchUpdateQuiz() {
  const { quizAPIClient } = useUserContext();
  const { updateCourseDetails } = useCourse();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
 

  const { id } = useParams();

  const updateQuiz = useCallback(
    async (data: IQuiz) => {
      setIsLoading(true);

      try {
        const response = await quizAPIClient.updateQuiz(
          data._id,
          id as string,
          data
        );
       
        await queryClient.refetchQueries({
          queryKey: ['courseData', id],
        });

        if (response.courseDetails) {
          updateCourseDetails(response.courseDetails);
        }

        return response;
      } catch (error) {
        console.error("Failed to update quiz:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [quizAPIClient, id, queryClient, updateCourseDetails]
  );
  return { updateQuiz, isLoading };
}
