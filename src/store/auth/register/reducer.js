import { validationErrors } from 'utils';

import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  error: {},
};

const account = (state = initialState, action) => {
  switch (action.type) {
    // REGISTER
    case REGISTER:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: validationErrors(action.payload),
      };

    default:
      return state;
  }
};

export default account;
