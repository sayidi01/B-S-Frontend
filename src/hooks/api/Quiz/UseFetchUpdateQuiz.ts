import { useCallback } from "react";
import { useUserContext } from "../../../config/UserContext";
import { CreateQuizData } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";






export default function UseFetchUpdateQuiz(quizID: string) {
  const {quizAPIClient} = useUserContext()


  const updateQuiz = useCallback((data: CreateQuizData) => {
    quizAPIClient
    .updateQuiz(quizID, data)

  },[])

  return {updateQuiz }
}