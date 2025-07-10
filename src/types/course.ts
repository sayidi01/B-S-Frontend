import { ILesson } from "../components/Admins/Course/Edit/Lessons/TypesLessons";
import { IQuiz } from "../components/Admins/Course/Edit/Quiz/quiz.types";
import { ChapterTimelineElement, IChapter } from "./chapter";

export enum ElementType {
  Chapter = "chapter",
  Lesson = "lesson",
  Quiz = "quiz",
}

export interface CourseTimelineElement<T extends "lesson" | "quiz", Modal> {
  type: T;
  data: Modal;
}

interface GetLessonData {
  _id: string;
  title: string;
  description?: string;
  content?: string;
}

export interface QuizGetterResponse {
  _id: string;
  name: string;
  questions: IQuiz["questions"];
  createdAt: string;
}

export interface CourseTimelineChapter {
  type: ElementType.Chapter;
  data: IChapter;
  timeline: CourseTimelineElement<
    ElementType.Quiz | ElementType.Lesson,
    QuizGetterResponse | GetLessonData
  >[];
}

export type CourseTimeline =
  | CourseTimelineChapter
  | CourseTimelineElement<ElementType.Lesson, GetLessonData>
  | CourseTimelineElement<ElementType.Quiz, QuizGetterResponse>;



// -------

export interface ICourse {
  _id: string;
  title: string
  id: string
  courseData: CourseData;
  timeline: TimelineItem[];
  quizzes: QuizGetterResponse[];
   imageCourse: string;
   createdAt: string
}

export interface CourseData {
  id: string
  _id: string;
  title: string;
  imageCourse: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  timeline: TimelineReference[];
}

export interface TimelineReference {
  elementName: 'chapter' | 'quiz' | 'lesson';
  id: string;
}

export type TimelineItem = ChapterTimelineItem | QuizTimelineItem | LessonTimelineItem;

export interface ChapterTimelineItem {
  _id: string
  id: string
  type: 'chapter';
  data: ChapterData;
  timeline: (TimelineItem | null)[];
}

export interface QuizTimelineItem {
  _id: string
  id: string
  type: 'quiz';
  data: QuizData;
}

export interface LessonTimelineItem {
  _id: string
  id: string
  type: 'lesson';
  data: LessonData;
}

export interface ChapterData {
  _id: string;
  title: string;
  courseId?: string;
  quizzes?: ChapterQuizLink[];
  __v: number;
  createdAt?: string;
  updatedAt: string;
  timeline: TimelineReference[];
  name: string
}

export interface ChapterQuizLink {
  quizId: string;
  afterLessonIndex: number;
  _id?: string;
  orderQuiz?: number;
}

export interface QuizData {
  id: string
  _id: string;
  name: string;
  elementName: 'quiz'
  questions: Question[];
  score: number;
  
}

export interface Question {
  type?: 'single_choice' | 'true_false';
  question: string;
  options: Option[];
  correctAnswer: string;
  matchingPairs: any[]; // Can be typed more strictly if structure known
  fillTheBlank: any[];  // Same here
  _id: string;
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface LessonData {
  id: string
  _id: string;
  elementName: 'lesson';
  title: string;
  description: string;
  content?: string;
    name: string

}

export interface IcourseResponses {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    imageCourse?: string;
  };
  expiredDateCourse: string;
  isExpired: boolean;
  learningMode: string;
  creationDate: string;
  courseDetails: {
    courseData: ICourse["courseData"];
    timeline: TimelineItem[];
  };
}