import { useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";

interface UseFetchProgressResult {
  progress: {
    progressPercent: number;
    earnedPoints: number;
    totalPoints: number;
  } | null;
  loading: boolean;
  error: string | null;
}

interface ProgressResponse {
  progress: {
    progressPercent: number;
    earnedPoints: number;
    totalPoints: number;
  };
}

function useFetchProgressStudentData(
  courseID: string,
  studentId: string
): UseFetchProgressResult {
  const { courseApiClient } = useUserContext();

  const [progress, setProgress] = useState<{
    progressPercent: number;
    earnedPoints: number;
    totalPoints: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseID || !studentId) {
      setError("Course ID or Student ID is missing");
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = (await courseApiClient.getCourseProgressStudent(
          courseID,
          studentId
        )) as ProgressResponse;
        setProgress(response.progress);
        console.log(response.progress, "Progress Data");
        setError(null);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
        setError("Failed to fetch progress");
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseID, studentId]);

  return { progress, loading, error };
}

export default useFetchProgressStudentData;
