import { useCallback, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IQuiz } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { useCourse } from "../../../components/Admins/SingleCourse";
import { useParams } from "react-router-dom";




export default function UseFetchUpdateQuiz() {
  const { quizAPIClient } = useUserContext();
  const { updateCourseDetails } = useCourse();
  const [isLoading, setIsLoading] = useState(false);

  const [quizData, setQuizData] = useState<IQuiz | null>(null);

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
        if (response.courseDetails) {
          updateCourseDetails(response.courseDetails);
        }

        return response;
      } finally {
        setIsLoading(false);
      }
    },
    [quizAPIClient, isLoading]
  );

  return { updateQuiz, isLoading };
}
