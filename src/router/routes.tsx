
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));

const AccountAdmins = lazy(() => import('../components/Admins/AccountAdmins'));

const ListAdmins = lazy(() => import('../components/Admins/ListAdmins'));

const Signin = lazy(() => import('../pages/Signin'));

const PrivateRoutes = lazy(() => import('../router/PrivateRoutes'))

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
