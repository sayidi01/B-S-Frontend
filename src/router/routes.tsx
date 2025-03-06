import { lazy } from "react";
import SingleCourse from "../components/Admins/SingleCourse";
import CourseTextEditor from "../components/Admins/CourseTextEditor";
import Chapters from "../components/Admins/Course/Edit/Chapters";
import Lessons from "../components/Admins/Course/Edit/Lessons";
import Home from "../components/Admins/Course/Edit/Home";
import Quiz from "../components/Admins/Course/Edit/Quiz";
import SingleChapter from "../components/Admins/Course/Edit/Chapters/SingleChapter";
import EditLesson from "../components/Admins/Course/Edit/Lessons/EditLesson";
import SingleLesson from "../components/Admins/Course/Edit/Lessons/SingleLesson";
import CreateNewCourse from "../components/Admins/CreateNewCourse";
import CretaNewQuiz from "../components/Admins/Course/Edit/Quiz/CreateNewQuiz"
import SingleQuiz from "../components/Admins/Course/Edit/Quiz/SingleQuiz";
import UpdateQuizData from "../components/Admins/Course/Edit/Quiz/UpdateQuizData";
import CourseView from "../pages/SingleCourse";

import LessonView from "../pages/SingleCourse/LessonView";
import ChapterView from "../pages/SingleCourse/ChapterView";

import QuizView from "../pages/SingleCourse/QuizView";

const Index = lazy(() => import("../pages/Index"));

const AccountAdmins = lazy(() => import("../components/Admins/AccountAdmins"));

const ListAdmins = lazy(() => import("../components/Admins/ListAdmins"));

const ListTeacher = lazy(() => import("../components/Teachers/ListTeacher"));

const ListStudent = lazy(() => import("../components/Students/ListStudent"));

const UploadPdfCourses = lazy(
  () => import("../components/Admins/UploadCourses")
);

const Signin = lazy(() => import("../pages/Signin"));

const PrivateRoutes = lazy(() => import("../router/PrivateRoutes"));

const Chat = lazy(() => import("../pages/Chat"));

const Calendar = lazy(() => import("../pages/Calendar"));

const Vitrine = lazy(() => import("../pages/Vitrine"));

const routes = [
  {
    path: "/Dashbord",
    element: <PrivateRoutes />,
    layout: "default",
    children: [
      {
        path: "",
        element: <Index />,
        layout: "default",
      },
      {
        path: "Admin",
        element: <AccountAdmins />,
        layout: "default",
      },
      {
        path: "ListAdmin",
        element: <ListAdmins />,
        layout: "default",
      },
      {
        path: "ListTeacher",
        element: <ListTeacher />,
        layout: "default",
      },
      {
        path: "ListStudent",
        element: <ListStudent />,
        layout: "default",
      },
      {
        path: "courses",
        element: <UploadPdfCourses />,
      },
      {
        path: "newcourse",
        element: <CreateNewCourse/>,
        layout: "default"
      },
      {
        path: "courses/:id",
        element: <SingleCourse />,
        children: [
          {
            path: "",
            element: <CourseView />,
          },
          {
            path: "chapter/:chapterId",
            element: <ChapterView />, 
          },
          {
            path: "quiz/:quizID",
            element: <QuizView />,
          },
          {
            path: "lesson/:lessonID",
            element: <LessonView />,
          },
        ]
      },
      {
        path: "courses/:id/edit",
        element: <CourseTextEditor />,
        layout: "default",
        children: [
          {
            path: "",
            element: <Home />,
            layout: "default",
          },
          {
            path: "chapters",
            element: <Chapters />,
            layout: "default",
            children: [
              {
                path: ":chapterId",
                element: <SingleChapter />,
                layout: "default",
              },
            ],
          },

          {
            path: "lessons",
            element: <Lessons />,
            layout: "default",
          },
          {
            path: "lessons/:lessonID",
            element: <EditLesson />,
            layout: "default",
          },
          {
            path: "lesson/:lessonID",
            element: <SingleLesson />,
            layout: "default",
          },

          {
            path: "quiz",
            element: <Quiz />,
            layout: "default",
          },
          {
            path: "create-quiz",
            element: <CretaNewQuiz />,
            layout: "default",
          },
          {
            path: "quiz/:quizID",
            element: <SingleQuiz/>,
            layout: "default"
          },
          {
            path: "quizzes/:quizID",
            element: <UpdateQuizData/>,
            layout: "default"
          },
        ],
      },
      {
        path: "chat",
        element: <Chat />,
        layout: "default",
      },
      {
        path: "calendar",
        element: <Calendar />,
        layout: "default",
      },
      {
        path: "vitrine",
        element: <Vitrine />,
        layout: "default",
      },
    ],
  },
];

const publicRoutes = [
  {
    path: "/",
    element: <Signin />,
    layout: "blank",
  },
];

export { routes, publicRoutes };
