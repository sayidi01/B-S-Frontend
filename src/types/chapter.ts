import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";
import { ChapterTimelineItem } from "./course";


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
  timeline: ChapterTimelineItem["timeline"];
  [x: string]: string | ChapterTimelineItem["timeline"];
}
