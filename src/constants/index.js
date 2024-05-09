// Storage key
export const storageKey = {
  AUTHENTICATE_TOKEN: 'AUTHENTICATE_TOKEN',
  AUTHENTICATE_REFRESH_TOKEN: 'AUTHENTICATE_REFRESH_TOKEN',
};

export const LOCATIONS = {
  HOME_PAGE: '/home',
  NOT_FOUND: '/404-NOT-FOUND',

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  ROLE_LIST: '/roles',
  ROLE_CREATE: '/roles/create',
  ROLE_UPDATE: '/roles/update/:id',

  USER_LIST: '/users',
  USER_CREATE: '/users/create',
  USER_UPDATE: '/users/update/:id',

  DEVICE_LIST: '/devices',
  DEVICE_CREATE: '/devices/create',
  DEVICE_UPDATE: '/devices/update/:id',
};

export const headerNavigation = [
  {
    link: LOCATIONS.MY_RECORD,
    name: 'My Record',
    label: '自分の記録',
    icon: '---',
    isShowOnHeader: true,
    isShowOnMenu: true,
  },
  {
    link: '#',
    name: 'Challenge',
    label: 'チャレンジ',
    icon: '---',
    isShowOnHeader: true,
    isShowOnMenu: false,
  },
  {
    link: '#',
    name: 'Note',
    label: 'お知らせ',
    icon: '---',
    isShowOnHeader: true,
    isShowOnMenu: false,
  },
  {
    link: '#',
    name: 'Weight Chart',
    label: '体重グラフ',
    isShowOnHeader: false,
    isShowOnMenu: true,
  },
  {
    link: '#',
    name: 'Target',
    label: '目標',
    isShowOnHeader: false,
    isShowOnMenu: true,
  },
  {
    link: '#',
    name: 'Selected Course',
    label: '選択中のコース',
    isShowOnHeader: false,
    isShowOnMenu: true,
  },
  {
    link: LOCATIONS.COLUMN_PAGE,
    name: 'Column Page',
    label: 'コラム一覧',
    isShowOnHeader: false,
    isShowOnMenu: true,
  },
  {
    link: '#',
    name: 'Setting',
    label: '設定',
    isShowOnHeader: false,
    isShowOnMenu: true,
  },
];

export const MEAL_TYPE = {
  MORNING: 'Morning',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
  SNACK: 'Snack',
};

export const DEFAULT_PAGINATION = { PAGE: 1, PAGE_SIZE: 5 };
