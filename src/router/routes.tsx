
import { lazy } from "react";
import SingleCourse from "../components/Admins/SingleCourse";


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

const EditorText = lazy(() => import("../pages/EditorText"));

const Chat = lazy(() => import("../pages/Chat"));

const Calendar  = lazy(() => import("../pages/Calendar"));

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
        path: "editorText",
        element: <EditorText/>,
        layout: "default",
      },
      {
        path: "chat",
        element: <Chat/>,
        layout: "default",
      },
      {
        path: "calendar",
        element: <Calendar/>,
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
