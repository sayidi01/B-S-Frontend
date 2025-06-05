import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { ILesson } from "../../../components/Admins/Course/Edit/Lessons/TypesLessons";
import { toast } from "react-hot-toast";
import { useCourse } from "../../../components/Admins/SingleCourse";
import { ICourse } from "../../../types/course";
import { useQueryClient } from "@tanstack/react-query";




export default function useFetchLessonData(courseId: string) {
  const { lessonAPIClient } = useUserContext();
  const [lessonData, setLessonData] = useState<ILesson[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateCourseDetails} = useCourse();
  const queryClient = useQueryClient();

  const createLesson = useCallback(
    async (
      courseId: string,
     
      title: string,
      description: string
    ) => {
      setIsLoading(true);
      try {
        const response = (await lessonAPIClient.createLesson(
          courseId,
          title,
          description
        )) as { data: { lesson: ILesson; courseDetails?: ICourse } };
        setLessonData((prev) => [...prev, response.data.lesson]);
        queryClient.refetchQueries({
          queryKey: ['courseData', courseId],
        });
        setError(null);
      } catch (err) {
        console.error("Error creating lesson:", err);
        setError("Failed to create lesson");
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
          queryClient.refetchQueries({
            queryKey: ['courseData', courseId],
          });

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
      }>
    ) => {
      setIsLoading(true);
      lessonAPIClient
        .updateLesson(lessonId, data)
        .then((response) => {
          const lessonResponse = response.data.data as {
            lesson: ILesson;
            courseDetails?: ICourse;
          };

          setLessonData((prev) =>
            prev.map((lesson) =>
              lesson._id === lessonId ? lessonResponse.lesson : lesson
            )
          );

          if (lessonResponse.courseDetails) {
            updateCourseDetails(lessonResponse.courseDetails);
          }

          setError(null);
          toast.success("Lesson Updated Successfully");
        })
        .catch((err) => {
          console.log("Error updating Lesson: ", err);
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
