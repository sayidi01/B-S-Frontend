import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { ILesson } from "../../../components/Admins/Course/Edit/Lessons/TypesLessons";
import { toast } from "react-hot-toast";
import { S } from "@fullcalendar/core/internal-common";

export default function useFetchLessonData(courseId: string,  lessonId?: string) {
  const { lessonAPIClient } = useUserContext();
  const [lessonData, setLessonData] = useState<ILesson[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);



  const createLesson = useCallback(
    async (
      courseId: string,
      chapterId: string,
      title: string,
      description: string
    ) => {
      setIsLoading(true);
      try {
        const response = (await lessonAPIClient.createLesson(
          courseId,
          chapterId,
          title,
          description
        )) as { data: { lesson: ILesson } };
        console.log("hello", response.data.lesson);
        setLessonData((prev) => [...prev, response.data.lesson]);
        setError(null);
      } catch (err) {
        console.error("Error creating lesson:", err);
        setError("Failed to create lesson");
        setLessonData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [lessonAPIClient]
  );

  useEffect(() => {
    if (!courseId) return;
    setIsLoading(true);
    lessonAPIClient
      .getAllLessonByCourse(courseId)
      .then((response) => {
        const data = (response as { data: { lessons: ILesson[] } }).data;
        setLessonData(data.lessons);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lesson data : ", err);
        setError("Failed to fetch lesson data ");
        toast.error("Failed to fetch lessons");
        setIsLoading(false);
      });
  }, [lessonAPIClient, courseId]);

  const deleteLesson = useCallback(
    (lessonId: string) => {
      setIsLoading(true);

      lessonAPIClient
        .deleteLesson(lessonId)
        .then(() => {
          setLessonData((prev) =>
            prev ? prev.filter((lesson) => lesson._id !== lessonId) : prev
          );
          setError(null);
          toast.success("Lesson deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting lesson:", err);
          setError("Failed to delete lesson");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [lessonAPIClient]
  );

  const updateLesson = useCallback(
    (
      lessonId: string,
      data: Partial<{
        title: string;
        description: string;
        content: string;
        courseId: string;
        chapterId: string;
      }>
    ) => {
      setIsLoading(true);
      lessonAPIClient
        .updateLesson(lessonId, data)
        .then((response) => {
          console.log(response, "lesson Update");
          setLessonData((prev) =>
            prev.map((lesson) =>
              lesson._id === lessonId ? { ...lesson, ...data } : lesson
            )
          );
          setError(null);
          toast.success("Lesson Updated Successfully");
        })
        .catch((err) => {
          console.log("Error updating Lesoon : ", err);
          setError("Failed to update lesson");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [lessonAPIClient]
  );


  return {
    createLesson,
    lessonData,
    error,
    isLoading,
    deleteLesson,
    updateLesson,
   
  };
}
