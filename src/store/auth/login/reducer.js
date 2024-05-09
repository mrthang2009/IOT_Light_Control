import { validationErrors } from 'utils';

import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,

  error: {},
};

const login = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: validationErrors(action.payload),
      };

    default:
      return state;
  }
};

export default login;
