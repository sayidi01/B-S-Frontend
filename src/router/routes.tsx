
import { Layout } from 'antd';
import { lazy } from 'react';





const Index = lazy(() => import('../pages/Index'));

const AccountAdmins = lazy(() => import('../components/Admins/AccountAdmins'));

const ListAdmins = lazy(() => import('../components/Admins/ListAdmins'));

const ListTeacher = lazy(() => import('../components/Teachers/ListTeacher'))

const ListStudent = lazy(() => import('../components/Students/ListStudent'))

const UploadPdfCourses = lazy(()=> import("../components/Admins/UploadPdfCourses"))


const Signin = lazy(() => import('../pages/Signin'));

const PrivateRoutes = lazy(() => import('../router/PrivateRoutes'))

const AllCourses = lazy(() => import("../components/Admins/AllCourses") )

const routes = [
    {
      path: '/Dashbord',
      element: <PrivateRoutes />,
      layout: 'default',
      children: [
        {
          path: '',
          element: <Index />,
          layout: 'default',
        },
        {
          path: 'Admin', 
          element: <AccountAdmins />,
          layout: 'default',
         
        },
        {
            path: 'ListAdmin',
            element: <ListAdmins />,
            layout: 'default',
          },
          {
            path: 'ListTeacher',
            element: <ListTeacher />,
            layout: 'default',
          },
          {
            path: 'ListStudent',
            element: <ListStudent/>,
            layout: 'default',
          },
          {
            path: 'uploadPDFCourses',
            element: <UploadPdfCourses/>,
            layout: 'default',
          },
          {
            path: 'Courses',
            element: <AllCourses/>,
            Layout: 'default'
          }
      ],
    },
  ];

const publicRoutes = [
    {
        path: '/',
        element: <Signin />,
        layout: 'blank',
    },
];

export { routes, publicRoutes };
