
import { useEffect, useState } from "react";
import { ICourse } from "../../../types/course";
import { useUserContext } from "../../../config/UserContext";



export default function useFetchQuizzesByCourseData(courseID: string) {

    const { courseApiClient } = useUserContext();

    const [courseData, setCourseData] = useState<null | { data: ICourse }>(null);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      courseApiClient
        .getAllQuizzesByCourse(courseID)
        .then((response) => {
          setCourseData(response as { data: ICourse });
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