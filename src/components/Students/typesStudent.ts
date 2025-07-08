import { S } from "@fullcalendar/core/internal-common";
import { ICourse } from "../../types/course";

export interface FormDataStudent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  accountExpiryDate?: string;
  myCourses: { courseId: string; expiredDateCourse?: string }[];
  learningMode: "on-site" | "online";
}

export interface Student {
  courseId: string;
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  password: string;
  phone: string;
  image?: string;
  accountExpiryDate?: string;
  creationDate: string;
  myCourses: { courseId: string; expiredDateCourse?: string }[];
  learningMode: "on-site" | "online";
}

export interface StudentResponse {
  students: Student[];
  student: Student;
  image: string;
}

export interface IcourseResponse {
  _id: string;
  courseId: ICourse;
  isExpired: boolean;
  expiredDateCourse?: string;
  learningMode?: "on-site" | "online";
  accountExpiryDate?: string;
  creationDate?: string;
  myCourses: { courseId: string; expiredDateCourse?: string }[];
}
