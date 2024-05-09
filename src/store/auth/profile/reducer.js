import propTypeModels from 'propTypeModels';

import {
  GET_ME,
  LOGOUT,
  UPDATE_ME,
  GET_ME_FAILED,
  GET_ME_SUCCESS,
  DELETE_MY_AVATAR,
  UPDATE_ME_FAILED,
  UPDATE_MY_AVATAR,
  UPDATE_ME_SUCCESS,
  UPDATE_MY_PASSWORD,
  REFRESH_TOKEN_FAILED,
  DELETE_MY_AVATAR_FAILED,
  UPDATE_MY_AVATAR_FAILED,
  DELETE_MY_AVATAR_SUCCESS,
  UPDATE_MY_AVATAR_SUCCESS,
  UPDATE_MY_PASSWORD_FAILED,
  UPDATE_MY_PASSWORD_SUCCESS,
} from './actionTypes';

const initialState = {
  loading: false,
  loadingAvatar: false,
  loadingPassword: false,
  loadingUpdate: false,

  me: propTypeModels.user.defaultData,
  passwordError: {},
  error: {},
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
    // GET MY PROFILE
    case GET_ME:
      return {
        ...state,
        loading: true,
      };

    case GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload,
      };

    case GET_ME_FAILED:
      return {
        ...state,
        loading: false,
        me: initialState.me,
      };

    // UPDATE MY PROFILE
    case UPDATE_ME:
      return {
        ...state,
        loadingUpdate: true,
        error: propTypeModels.user.defaultData,
      };

    case UPDATE_ME_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        me: action.payload,
      };

    case UPDATE_ME_FAILED:
      return {
        ...state,
        loadingUpdate: false,
        error: action.payload,
      };

    // UPDATE MY AVATAR
    case UPDATE_MY_AVATAR:
      return {
        ...state,
        loadingAvatar: true,
      };

    case UPDATE_MY_AVATAR_SUCCESS:
      return {
        ...state,
        loadingAvatar: false,
        me: {
          ...state.me,
          avatar: action.payload.avatar,
        },
      };

    case UPDATE_MY_AVATAR_FAILED:
      return {
        ...state,
        loadingAvatar: false,
      };

    // DELETE MY AVATAR
    case DELETE_MY_AVATAR:
      return {
        ...state,
        loadingAvatar: true,
      };

    case DELETE_MY_AVATAR_SUCCESS:
      return {
        ...state,
        loadingAvatar: false,
        me: {
          ...state.me,
          avatar: '',
        },
      };

    case DELETE_MY_AVATAR_FAILED:
      return {
        ...state,
        loadingAvatar: false,
      };

    // UPDATE MY PASSWORD
    case UPDATE_MY_PASSWORD:
      return {
        ...state,
        loadingPassword: true,
      };

    case UPDATE_MY_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPassword: false,
      };

    case UPDATE_MY_PASSWORD_FAILED:
      return {
        ...state,
        loadingPassword: false,
        passwordError: action.payload,
      };

    // LOGOUT
    case LOGOUT: {
      return {
        ...state,
        me: initialState.me,
      };
    }

    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        me: initialState.me,
      };

    default:
      return state;
  }
};

export default userProfile;
