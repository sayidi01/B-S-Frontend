import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ILesson } from "../../../components/Admins/Course/Edit/Lessons/TypesLessons";
import { useUserContext } from "../../../config/UserContext";

export default function useFetchSingleLesson(
  courseID: string,
  lessonID: string
) {
  const { lessonAPIClient } = useUserContext();
  const [lessonData, setLessonData] = useState<ILesson | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!courseID || !lessonID) return;
    setIsLoading(true);
    lessonAPIClient
      .getLessonById(lessonID)
      .then((response) => {
        const data = (response as { data: { lesson: ILesson } }).data;
        setLessonData(data.lesson);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lesson data : ", err);
        setError("Failed to fetch lesson data ");
        toast.error("Failed to fetch lesson");
        setIsLoading(false);
      });
  }, [lessonAPIClient, courseID, lessonID]);

  return { lessonData, isLoading, error };
}
