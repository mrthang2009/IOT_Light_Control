import moment from 'moment';
import { toast } from 'react-toastify';

export const convertIsoDateToString = (date, format = 'YYYY.MM.DD') => {
  if (date === '' || date === undefined || date === null) return '';

  return moment(new Date(date)).format(format);
};

export const convertCapitalString = (str) => {
  const mess = str.trim();
  return mess.charAt(0).toUpperCase() + mess.slice(1).toLowerCase();
};

export const showSuccess = (mess) => {
  toast.success(convertCapitalString(mess));
};

export const showError = (mess) => {
  toast.error(convertCapitalString(mess));
};

export const handleErrorResponse = (error, defaultMessage) => {
  if (error.response) {
    let errorsMessage = '';
    if (error.response.data.error) {
      errorsMessage = error.response.data.error;
    } else if (error.response.data.errors) {
      const { errors } = error.response.data;
      errorsMessage = errors.join('');
    }
    showError(errorsMessage);
  } else {
    showError(defaultMessage);
  }
};

export const getParamsFormObject = (queries) => {
  const validQueries = {};
  Object.keys(queries).forEach((key) => {
    const value = queries[key];
    // Kiểm tra nếu giá trị không phải là "", undefined hoặc null
    if (value !== '' && value !== undefined && value !== null) {
      validQueries[key] = String(value); // Chuyển đổi giá trị thành chuỗi và thêm vào validQueries
    }
  });

  const searchParams = new URLSearchParams(validQueries);
  return `?${searchParams.toString()}`;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
