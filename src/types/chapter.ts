export interface IChapter {
  _id: string;
  title: string;
  courseId: string;
  quizzes: {
    _id: string
    quizId: string;
    title: string; 
    afterLessonIndex: number;
  }[];
}
