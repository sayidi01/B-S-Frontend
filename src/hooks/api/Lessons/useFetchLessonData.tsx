import { useCallback, useState } from 'react';
import { useUserContext } from '../../../config/UserContext';
import { ILesson } from '../../../components/Admins/Course/Edit/Lessons/TypesLessons';

export default function useFetchLessonData() {
    const { lessonAPIClient } = useUserContext();
    const [lessonData, setLessonData] = useState<null | ILesson>(null);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createLesson = useCallback(async (courseId: string, chapterId: string, title: string, description: string, ) => {
        setIsLoading(true);
        try {
            const response = await lessonAPIClient.createLesson(courseId, chapterId, title, description);
            setLessonData(response as ILesson);
            setError(null);
        } catch (err) {
            console.error('Error creating lesson:', err);
            setError("Failed to create lesson");
            setLessonData(null);
        } finally {
            setIsLoading(false);
        }
    }, [lessonAPIClient]);

    return { createLesson, lessonData, error, isLoading };
}