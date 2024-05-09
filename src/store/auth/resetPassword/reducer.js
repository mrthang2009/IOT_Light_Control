import { RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
};

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    // RESET PASSWORD
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default resetPassword;
