import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '../../../config/UserContext';
import { ILesson } from '../../../components/Admins/Course/Edit/Lessons/TypesLessons';
import { toast } from 'react-hot-toast';

export default function useFetchLessonData(courseId: string,) {
    const { lessonAPIClient } = useUserContext();
    const [lessonData, setLessonData] = useState<ILesson[] | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    

    const createLesson = useCallback(async (courseId: string, chapterId: string, title: string, description: string, ) => {
        setIsLoading(true);
        try {
            const response = await lessonAPIClient.createLesson(courseId, chapterId, title, description);
            setLessonData(response as ILesson[]);
            setError(null);
        } catch (err) {
            console.error('Error creating lesson:', err);
            setError("Failed to create lesson");
            setLessonData(null);
        } finally {
            setIsLoading(false);
        }
    }, [lessonAPIClient]);


    useEffect(() => {
        if(!courseId) return;
        setIsLoading(true);
        lessonAPIClient.getAllLessonByCourse(courseId)
        .then((response) => {
            const data = (response as { data: { lessons: ILesson[] } }).data; 
            setLessonData(data.lessons);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching lesson data : ", err)
            setError("Failed to fetch lesson data ")
            setLessonData(null)
            toast.error("Failed to fetch lessons");
            setIsLoading(false)
        }) 

    },[lessonAPIClient, courseId])


    const deleteLesson = useCallback(
        (lessonId: string) => {
          setIsLoading(true);
          
          lessonAPIClient.deleteLesson(lessonId)
            .then(() => {
                setLessonData((prev) => prev ? prev.filter((lesson) => lesson._id !== lessonId) : prev);
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
      
        }, [lessonAPIClient]);
    

    return { createLesson, lessonData, error, isLoading, deleteLesson };
}