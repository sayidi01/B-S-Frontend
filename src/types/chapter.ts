import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";
import { LessonData, QuizData, TimelineReference } from "./course";

interface ChapterTimelineLesson extends ILesson {
  id: string;
  elementName: "lesson";
}

interface ChapterTimelineQuiz extends IQuiz {
  id: string;
  elementName: "quiz";
}

export type ChapterTimelineElement =
  | ChapterTimelineLesson
  | ChapterTimelineQuiz;

export interface IChapter {
  _id: string;
  title: string;
  courseId: string;
  timeline: TimelineReference[];
  [x: string]: string | TimelineReference[];
}

export interface SingleChapterView {
  _id: string;
  title: string;
  courseId: string;
  timeline: (QuizData | LessonData)[];
  [x: string]: string | (QuizData | LessonData)[];
}

export interface ChapterTimelineItem {
  id: string;
  title: string;
  elementName: "lesson" | "quiz";
  type: "lesson" | "quiz";
  data: ChapterTimelineElement;
  createdAt: string;
  updatedAt: string;
  __v: number;
  timeline: ChapterTimelineItem[];
}
