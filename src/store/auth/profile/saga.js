import authApi from 'api/authApi';
import userApi from 'api/userApi';
import axiosClient from 'utils/axios';
import { put, takeLeading } from 'redux-saga/effects';
import { apiErrorHandler, showSuccessTrans, removeSpacesWithTrim } from 'utils/index';

import { LOCATIONS, storageKey } from 'src/constants';

import {
  GET_ME,
  LOGOUT,
  UPDATE_ME,
  GET_ME_FAILED,
  GET_ME_SUCCESS,
  DELETE_MY_AVATAR,
  UPDATE_MY_AVATAR,
  UPDATE_MY_PASSWORD,
  REFRESH_TOKEN_SUCCESS,
} from './actionTypes';
import {
  actionUpdateMeFailed,
  actionUpdateMeSuccess,
  actionDeleteMyAvatarFailed,
  actionUpdateMyAvatarFailed,
  actionDeleteMyAvatarSuccess,
  actionUpdateMyAvatarSuccess,
  actionUpdateMyPasswordFailed,
  actionUpdateMyPasswordSuccess,
} from './actions';

const responseFake = {
  status: 200,
  code: 200,
  message: 'Thành công',
  payload: {
    _id: 'xxxxxxxxxxxxxxxxxxxx',
    gender: 'MALE',
    vToken: 0,
    name: 'All is fake',
    phoneNumber: '+84767777777',
    avatar:
      'https://gamek.mediacdn.vn/133514250583805952/2022/12/25/photo-9-1671781547687466432504-1671971829616-1671971829740998378477.jpg',
    email: 'fake@gmail.com',
    shop: {
      _id: '637c59c693aaa0365b72a621',
      name: 'brownclothes',
      displayName: 'BROWN CLOTHES STUDIO',
    },
  },
};

function* getMyUserProfile({ payload }) {
  try {
    // const response = yield userApi.getMe();
    const response = responseFake;

    yield put({
      type: GET_ME_SUCCESS,
      payload: response.payload,
    });
  } catch (error) {
    apiErrorHandler(error);

    localStorage.removeItem(storageKey.AUTHENTICATE_TOKEN);
    payload?.history?.push(LOCATIONS.LOGIN);

    yield put({ type: GET_ME_FAILED });
  }
}

function* resetToken({ payload }) {
  try {
    const { refreshAccessToken: refreshToken } = payload;

    const response = yield authApi.onRefreshToken(refreshToken);

    localStorage.setItem(storageKey.AUTHENTICATE_TOKEN, response.token);

    axiosClient.defaults.headers.Authorization = response.token;
  } catch (error) {
    apiErrorHandler(error);
  }
}

function* updateMe({ payload }) {
  try {
    const userData = payload;

    const newData = removeSpacesWithTrim(userData);

    const response = yield userApi.updateMe(newData);

    showSuccessTrans({ type: 'type.UPDATE' });

    yield put(actionUpdateMeSuccess(response.payload));
  } catch (error) {
    let errors;

    if (error.response?.data?.errors?.length) {
      errors = error.response?.data?.errors;
    } else {
      apiErrorHandler(error);
    }
    yield put(actionUpdateMeFailed(errors));
  }
}

function* updateMyAvatar({ payload }) {
  try {
    const { avatar, callback } = payload;
    const response = yield userApi.uploadMyAvatar({ avatar });

    showSuccessTrans({ type: 'type.UPDATE' });

    yield put(actionUpdateMyAvatarSuccess(response.payload));
    callback();
  } catch (error) {
    apiErrorHandler(error);

    yield put(actionUpdateMyAvatarFailed());
  }
}

function* deleteMyAvatar() {
  try {
    yield userApi.deleteMyAvatar();

    yield put(actionDeleteMyAvatarSuccess());
    showSuccessTrans({ type: 'type.DELETE' });
  } catch (error) {
    apiErrorHandler(error);
    yield put(actionDeleteMyAvatarFailed());
  }
}

function* updateMyPassword({ payload }) {
  try {
    const { userPwd, callback } = payload;

    yield userApi.updateMyPassword({ userPwd });

    showSuccessTrans({ name: 'profile.change_password' });

    yield put(actionUpdateMyPasswordSuccess());

    callback();
  } catch (error) {
    apiErrorHandler(error);

    yield put(actionUpdateMyPasswordFailed());
  }
}

// eslint-disable-next-line require-yield
function* logout({ payload }) {
  try {
    const { history } = payload;

    localStorage.removeItem(storageKey.AUTHENTICATE_TOKEN);

    history.push(LOCATIONS.LOGIN);
  } catch (error) {
    apiErrorHandler(error);
  }
}

export default function* UserProfileSaga() {
  yield takeLeading(GET_ME, getMyUserProfile);
  yield takeLeading(UPDATE_ME, updateMe);
  yield takeLeading(UPDATE_MY_AVATAR, updateMyAvatar);
  yield takeLeading(UPDATE_MY_PASSWORD, updateMyPassword);
  yield takeLeading(DELETE_MY_AVATAR, deleteMyAvatar);
  yield takeLeading(REFRESH_TOKEN_SUCCESS, resetToken);
  yield takeLeading(LOGOUT, logout);
}
