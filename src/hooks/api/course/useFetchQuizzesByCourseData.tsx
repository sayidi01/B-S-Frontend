
import { useEffect, useState } from "react";
import { ICourse } from "../../../types/course";
import { useUserContext } from "../../../config/UserContext";



export default function useFetchQuizzesByCourseData(courseID: string) {

    const { courseApiClient } = useUserContext();

    const [courseData, setCourseData] = useState<null | ICourse>(null);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      courseApiClient
        .getAllQuizzesByCourse(courseID)
        .then((response) => {
          const typedResponse = response as { data: ICourse }; 
        setCourseData(typedResponse.data);
        })
        .catch((err) => {
          const msg = "Failed to retrieve course data";
          setCourseData(null);
          setError(msg);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [courseID]);
  
    return { courseData, error, isLoading };
}