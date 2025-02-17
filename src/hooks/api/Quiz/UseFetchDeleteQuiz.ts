import { useCallback } from "react";
import { useUserContext } from "../../../config/UserContext";




export default function UseFetchDeleteQuiz ( quizID: string) {
    const {quizAPIClient} = useUserContext()
    

    const deleteQuiz = useCallback(() => {
        quizAPIClient
        .deleteQuizById(quizID)
    },[])

}