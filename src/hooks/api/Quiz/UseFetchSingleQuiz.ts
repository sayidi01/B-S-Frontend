
import { useUserContext } from '../../../config/UserContext';
import { IQuiz } from '../../../components/Admins/Course/Edit/Quiz/quiz.types';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';



export default function UseFetchSingleQuiz (courseID: string, quizID: string) {

    const {quizAPIClient} = useUserContext()

    const [quizData, setQuizData] = useState<IQuiz| null>(null)

    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if(!courseID || !quizID) return
        setIsLoading(true) 
        quizAPIClient
        .getSingleQuizById(quizID)
        .then((response) => {
            console.log(response)
            const data = (response as { data: {quiz: IQuiz} }).data;
            setQuizData(data.quiz)
            setIsLoading(false)
        })
        .catch((err) => {
            console.error("Error fetching single Quiz data : ", err);
            setError("Failed to fetch single Quiz data ");
            toast.error("Failed to fetch Quiz");
            setIsLoading(false);
        })
    },[quizAPIClient, courseID, quizID])

    return {quizData , isLoading, error};
}