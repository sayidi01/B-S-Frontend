import { lazy } from "react";
import SingleCourse from "../components/Admins/SingleCourse";
import CourseTextEditor from "../components/Admins/CourseTextEditor";
import Chapters from "../components/Admins/Course/Edit/Chapters";
import Lessons from "../components/Admins/Course/Edit/Lessons";
import Home from "../components/Admins/Course/Edit/Home";
import Quiz from "../components/Admins/Course/Edit/Quiz";

const Index = lazy(() => import("../pages/Index"));

const AccountAdmins = lazy(() => import("../components/Admins/AccountAdmins"));

const ListAdmins = lazy(() => import("../components/Admins/ListAdmins"));

const ListTeacher = lazy(() => import("../components/Teachers/ListTeacher"));

const ListStudent = lazy(() => import("../components/Students/ListStudent"));

const UploadPdfCourses = lazy(
  () => import("../components/Admins/UploadPdfCourses")
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
        path: "courses/:id",
        element: <SingleCourse />,
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
          },
          {
            path: "lessons",
            element: <Lessons />,
            layout: "default",
          },
          {
            path: "quiz",
            element: <Quiz />,
            layout: "default",
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
        ayout: "default",
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
