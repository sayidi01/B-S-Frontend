import APIClient from ".";

export type ChapterTimelineEdit = {
  elementName: "lesson" | "quiz";
  id: string;
}[];

export default class ChapterAPIClient extends APIClient {
  // @TODO Adapt interface
  async getAllChapterDataById(id: string) {
    return (await this.axiosInstance.get(`/course/${id}/chapters`)).data;
  }

  // @TODO Adapt interface
  async getSingleChapter(courseId: string, chapterId: string) {
    return (
      await this.axiosInstance.get(`/course/${courseId}/chapters/${chapterId}`)
    ).data;
  }

  // @TODO Adapt interface
  async addQuizToChpter(
    courseId: string,
    chapterId: string,
    quizID: string,
    orderQuiz: number
  ) {
    return (
      await this.axiosInstance.post(
        `/course/${courseId}/chapters/${quizID}/${chapterId}`,
        { orderQuiz }
      )
    ).data;
  }

  // @TODO Adapt interface
  async createChapter(courseId: string, title: string) {
    return (
      await this.axiosInstance.post(`/course/${courseId}/chapters`, {
        title,
        courseId,
      })
    ).data;
  }

  async deleteChapter(courseId: string, chapterId: string) {
    return (
      await this.axiosInstance.delete(
        `/course/${courseId}/chapters/${chapterId}`
      )
    ).data;
  }

  // @TODO Adapt interface
  async updateChapter(courseId: string, chapterId: string, title: string) {
    return (
      await this.axiosInstance.put(
        `/course/${courseId}/chapters/${chapterId}`,
        { title }
      )
    ).data;
  }
  async updateTimeline(
    courseId: string,
    chapterId: string,
    timeline: ChapterTimelineEdit
  ) {
    return (
      await this.axiosInstance.put(
        `/course/${courseId}/chapters/${chapterId}/timeline`,
        {
          timeline,
        }
      )
    ).data;
  }
}
