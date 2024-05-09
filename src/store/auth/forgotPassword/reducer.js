import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
};

const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    // FORGOT PASSWORD
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default forgotPassword;
