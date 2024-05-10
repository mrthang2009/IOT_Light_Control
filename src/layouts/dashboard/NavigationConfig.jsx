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
    title: 'Bảng điều khiển',
    path: LOCATIONS.CONTROL_PANEL,
    icon: icon('ic_analytics'),
  },
  {
    title: 'Thiết bị',
    path: LOCATIONS.DEVICE_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Vai trò',
    path: LOCATIONS.ROLE_LIST,
    icon: icon('ic_user'),
  },
  {
    title: 'Người dùng',
    path: LOCATIONS.USER_LIST,
    icon: icon('ic_user'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
