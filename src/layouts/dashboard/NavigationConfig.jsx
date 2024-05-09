import { LOCATIONS } from 'src/constants';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Nhân viên',
    path: LOCATIONS.EMPLOYEE_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Nhà cung cấp',
    path: LOCATIONS.SUPPLIER_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Danh mục',
    path: LOCATIONS.CATEGORY_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Vai trò',
    path: LOCATIONS.ROLE_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Khách hàng',
    path: LOCATIONS.CUSTOMER_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Sản phẩm',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Đơn hàng',
    path: '/orders',
    icon: icon('ic_cart'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'home',
    path: LOCATIONS.HOME_PAGE,
    icon: icon('ic_blog'),
  },
  {
    title: 'my record',
    path: LOCATIONS.MY_RECORD,
    icon: icon('ic_blog'),
  },
  {
    title: 'column page',
    path: LOCATIONS.COLUMN_PAGE,
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
