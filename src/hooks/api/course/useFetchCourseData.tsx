import { useEffect, useState } from "react";
import { ICourse } from "../../../types/course";
import { useUserContext } from "../../../config/UserContext";

export default function useFetchCourseData(courseID: string) {
  const { courseApiClient } = useUserContext();

  const [courseData, setCourseData] = useState<null | ICourse>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    courseApiClient
      .getCourseData(courseID)
      .then((response) => {
        setCourseData(response as ICourse);
      })
      .catch((err) => {
        const msg = "Failed to retrieve course data";
        setCourseData(null);
        setError(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { courseData, error, isLoading };
}
