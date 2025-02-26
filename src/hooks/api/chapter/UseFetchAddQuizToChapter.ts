import { useCallback } from "react";
import { useUserContext } from "../../../config/UserContext";
import toast from "react-hot-toast";




export default function UseFetchAddQuizTochapter() {
     const { chapterApiClient } = useUserContext();

     const addQuizTocChapter = useCallback(async(courseID: string,chapterID: string, quizID: string,  orderQuiz: number  ) => {

        try {
            const response = await chapterApiClient.addQuizToChpter(courseID,chapterID, quizID, orderQuiz )
            console.log(response)
            toast.success("Quiz added to chapter successfuly")
        } catch (error) {
            console.log(error, "error")
            toast.error("Failed to add quiz to chapter")
        }


     },[])

     return{addQuizTocChapter}
}