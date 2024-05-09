import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { LOCATIONS } from 'src/constants';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const Home = lazy(() => import('src/pages/TopPage'));

export const Role = lazy(() => import('src/pages/Role'));
export const RoleCreate = lazy(() => import('src/pages/Role/RoleCreate'));
export const RoleEdit = lazy(() => import('src/pages/Role/RoleEdit'));

export const Devices = lazy(() => import('src/pages/Device'));
export const DeviceCreate = lazy(() => import('src/pages/Device/Create'));
export const DeviceUpdate = lazy(() => import('src/pages/Device/Update'));

export const Customers = lazy(() => import('src/pages/Customers'));
export const CustomerCreate = lazy(() => import('src/pages/Customers/CustomerCreate'));
export const CustomerEdit = lazy(() => import('src/pages/Customers/CustomerEdit'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: LOCATIONS.HOME_PAGE, element: <Home /> },

        { path: LOCATIONS.ROLE_LIST, element: <Role /> },
        { path: LOCATIONS.ROLE_CREATE, element: <RoleCreate /> },
        { path: LOCATIONS.ROLE_UPDATE, element: <RoleEdit /> },

        { path: LOCATIONS.USER_LIST, element: <Customers /> },
        { path: LOCATIONS.USER_CREATE, element: <CustomerCreate /> },
        { path: LOCATIONS.USER_UPDATE, element: <CustomerEdit /> },

        { path: LOCATIONS.DEVICE_LIST, element: <Devices /> },
        { path: LOCATIONS.DEVICE_CREATE, element: <DeviceCreate /> },
        { path: LOCATIONS.DEVICE_UPDATE, element: <DeviceUpdate /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
