
import APIClient from ".";


export class LessonAPIClient extends APIClient {
    async createLesson(courseId: string, chapterId: string, title: string, description: string, ) {
        return (
            await this.axiosInstance.post(`/course/${courseId}/chapters/${chapterId}/lessons`, {title, description, chapterId,courseId})
        ).data;
    }
}