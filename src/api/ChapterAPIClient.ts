import APIClient from ".";




export  default class ChapterAPIClient extends APIClient {
   async getAllChapterDataById(id: string) {
    return (await this.axiosInstance.get(`/course/${id}/chapters`)).data
   }

   async createChapter(courseId: string, title: string) {
    return (
      await this.axiosInstance.post(`/course/${courseId}/chapters`, { title, courseId })
    ).data;
  }

  async deleteChapter(courseId: string, chapterId: string) {
    return (await this.axiosInstance.delete(`/course/${courseId}/chapters/${chapterId}`)).data;
  }
  
} 