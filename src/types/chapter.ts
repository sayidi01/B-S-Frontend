import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";


interface ChapterTimelineLesson extends ILesson {
  id: string;
  elementName: "lesson"
}

interface ChapterTimelineQuiz extends IQuiz {
  id: string;
  elementName: "quiz";
}

export type ChapterTimelineElement = ChapterTimelineLesson | ChapterTimelineQuiz;

export interface IChapter {
  _id: string;
  title: string;
  courseId: string;
  timeline: ChapterTimelineElement[]
  [x: string]: string | ChapterTimelineElement[];
}
