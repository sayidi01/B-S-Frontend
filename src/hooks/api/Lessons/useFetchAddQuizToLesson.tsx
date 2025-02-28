import { useCallback } from "react";
import { useUserContext } from "../../../config/UserContext";
import toast from "react-hot-toast";


export default function useFetchAddQuizToLesson () {
    const { lessonAPIClient } = useUserContext();

      const addQuizToLesson = useCallback(async(lessonId: string, quizId: string ) => {
        try {
            const response = await lessonAPIClient.addedQuizToLesson(lessonId,quizId)
            console.log(response)
            toast.success("Quiz added to lesson successfuly")
            
        } catch (error) {
            console.log(error, "error")
            toast.error("Failed to add quiz to lesson")
        }
        

      },[lessonAPIClient])

      return {addQuizToLesson}

}