import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { LOCATIONS } from 'src/constants';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const ColumnPage = lazy(() => import('src/pages/ColumnPage'));
export const Home = lazy(() => import('src/pages/TopPage'));
export const MyRecord = lazy(() => import('src/pages/MyRecord'));

export const Role = lazy(() => import('src/pages/Roles'));
export const RoleCreate = lazy(() => import('src/pages/Roles/RoleCreate'));
export const RoleEdit = lazy(() => import('src/pages/Roles/RoleEdit'));

export const Categories = lazy(() => import('src/pages/Categories'));
export const CategoryCreate = lazy(() => import('src/pages/Categories/CategoryCreate'));
export const CategoryEdit = lazy(() => import('src/pages/Categories/CategoryEdit'));

export const Customers = lazy(() => import('src/pages/Customers'));
export const CustomerCreate = lazy(() => import('src/pages/Customers/CustomerCreate'));
export const CustomerEdit = lazy(() => import('src/pages/Customers/CustomerEdit'));

export const Suppliers = lazy(() => import('src/pages/Suppliers'));
export const SupplierCreate = lazy(() => import('src/pages/Suppliers/SupplierCreate'));
export const SupplierEdit = lazy(() => import('src/pages/Suppliers/SupplierEdit'));

export const Employees = lazy(() => import('src/pages/Employees'));
export const EmployeesCreate = lazy(() => import('src/pages/Employees/CreateEmployee'));
export const EmployeesEditProfile = lazy(() => import('src/pages/Employees/EditEmployee'));

export const Products = lazy(() => import('src/pages/Products/index'));
export const ProductsCreate = lazy(() => import('src/pages/Products/CreateProduct'));
export const ProductsEdit = lazy(() => import('src/pages/Products/EditProduct'));

export const Orders = lazy(() => import('src/pages/Orders/index'));
export const OrdersCreate = lazy(() => import('src/pages/Orders/CreateOrder'));
export const OrdersEdit = lazy(() => import('src/pages/Orders/EditOrder'));

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
        { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: LOCATIONS.HOME_PAGE, element: <Home /> },
        { path: LOCATIONS.MY_RECORD, element: <MyRecord /> },
        { path: LOCATIONS.COLUMN_PAGE, element: <ColumnPage /> },
        { path: LOCATIONS.EMPLOYEE_LIST, element: <Employees /> },
        { path: LOCATIONS.EMPLOYEE_CREATE, element: <EmployeesCreate /> },
        { path: LOCATIONS.EMPLOYEE_EDIT_PROFILE, element: <EmployeesEditProfile /> },
        { path: LOCATIONS.MY_RECORD, element: <MyRecord /> },
        { path: LOCATIONS.COLUMN_PAGE, element: <ColumnPage /> },

        { path: LOCATIONS.ROLE_LIST, element: <Role /> },
        { path: LOCATIONS.ROLE_CREATE, element: <RoleCreate /> },
        { path: LOCATIONS.ROLE_EDIT, element: <RoleEdit /> },
        { path: LOCATIONS.CUSTOMER_LIST, element: <Customers /> },
        { path: LOCATIONS.CUSTOMER_CREATE, element: <CustomerCreate /> },
        { path: LOCATIONS.CUSTOMER_EDIT, element: <CustomerEdit /> },
        { path: LOCATIONS.CATEGORY_LIST, element: <Categories /> },
        { path: LOCATIONS.CATEGORY_CREATE, element: <CategoryCreate /> },
        { path: LOCATIONS.CATEGORY_EDIT, element: <CategoryEdit /> },
        { path: LOCATIONS.SUPPLIER_LIST, element: <Suppliers /> },
        { path: LOCATIONS.SUPPLIER_CREATE, element: <SupplierCreate /> },
        { path: LOCATIONS.SUPPLIER_EDIT, element: <SupplierEdit /> },

        { path: LOCATIONS.PRODUCT_LIST, element: <Products /> },
        { path: LOCATIONS.PRODUCT_CREATE, element: <ProductsCreate /> },
        { path: LOCATIONS.PRODUCT_EDIT, element: <ProductsEdit /> },
        { path: LOCATIONS.ORDER_LIST, element: <Orders /> },
        { path: LOCATIONS.ORDER_CREATE, element: <OrdersCreate /> },
        { path: LOCATIONS.ORDER_EDIT, element: <OrdersEdit /> },
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
