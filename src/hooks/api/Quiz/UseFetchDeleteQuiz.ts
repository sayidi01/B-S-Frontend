import { useCallback, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IQuiz } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";
import { toast } from "react-hot-toast";

export default function UseFetchDeleteQuiz(quizID: string) {
  const { quizAPIClient } = useUserContext();
  const [quizData, setQuizData] = useState<IQuiz[] | null>(null);

  const deleteQuiz = useCallback(async (quizID: string) => {
    try {
      const response = await quizAPIClient.deleteQuizById(quizID);
      console.log(response.data);

      setQuizData((prev) =>
        prev ? prev.filter((quiz) => quiz._id !== quizID) : prev
      );
      toast.success("Quiz deleted Successfully");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to delete Quiz");
    }
  }, [quizID, quizData]);


  return { deleteQuiz };
}
