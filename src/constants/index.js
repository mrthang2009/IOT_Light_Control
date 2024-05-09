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

  TOP_PAGE: '/top-page',
  MY_RECORD: '/my-record',
  COLUMN_PAGE: '/column-page',

  ROLE_LIST: '/roles',
  ROLE_CREATE: '/roles/create',
  ROLE_EDIT: '/roles/edit/:id',

  CUSTOMER_LIST: '/customers',
  CUSTOMER_CREATE: '/customers/create',
  CUSTOMER_EDIT: '/customers/edit-profile/:id',

  CATEGORY_LIST: '/categories',
  CATEGORY_CREATE: '/categories/create',
  CATEGORY_EDIT: '/categories/edit/:id',

  SUPPLIER_LIST: '/suppliers',
  SUPPLIER_CREATE: '/suppliers/create',
  SUPPLIER_EDIT: '/suppliers/edit/:id',

  EMPLOYEE_LIST: '/employees',
  EMPLOYEE_CREATE: '/employees/create',
  EMPLOYEE_EDIT_PROFILE: '/employees/edit-profile/:id',

  PRODUCT_LIST: '/products',
  PRODUCT_CREATE: '/products/create',
  PRODUCT_EDIT: '/products/edit/:id',

  ORDER_LIST: '/orders',
  ORDER_CREATE: '/orders/create',
  ORDER_EDIT: '/orders/edit/:id',
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

export const STATUS = {
  VALUE: {
    WAITING: 'WAITING',
    DELIVERING: 'DELIVERING',
    COMPLETED: 'COMPLETED',
    REJECTED: 'REJECTED',
  },
  CONVERT: {
    WAITING: 'Đang chờ',
    DELIVERING: 'Đang giao hàng',
    COMPLETED: 'Hoàn thành',
    REJECTED: 'Đơn bị hủy',
  },
};

export const PAYMENT_TYPE = {
  VALUE: {
    CASH: 'CASH',
    CARD: 'CARD',
  },
  CONVERT: {
    CASH: 'Tiền mặt',
    CARD: 'Thẻ',
  },
};

export const PAGINATION = {
  LIMIT: 10,
  SKIP: 0,
};

export const ISDELIVERING = {
  VALUE: {
    TRUE: 'true',
    FALSE: 'false',
  },
  CONVERT: {
    true: 'Trực tuyến',
    false: 'Trực tiếp',
  },
};
