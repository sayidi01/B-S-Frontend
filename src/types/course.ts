import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";
import { ChapterTimelineElement, IChapter } from "./chapter";

export interface ICourse {
  data: {
    quizzes: IQuiz[];
  };
  createdAt: string;
  title: string;
  updatedAt: string;
  url: string;
  _id: string;
  imageCourse: string;
  description: string;
  content?: string;
  chapters: IChapter[];
  courseData: {
    _id: string;
    title: string;
    imageCourse: string;
    description: string;
  };
  timeline?: ChapterTimelineElement[];
}
