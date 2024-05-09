// import authApi from 'api/auth/authApi';
import axiosClient from 'utils/axios';
import { showSuccess, apiErrorHandler } from 'utils';
import { put, takeLeading } from 'redux-saga/effects';

import { LOCATIONS, storageKey } from 'src/constants';

import { GET_ME } from '../profile/actionTypes';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function* login({ payload }) {
  try {
    const {
      // phoneNumber,
      // password,
      history,
    } = payload;

    // const response = yield authApi.login({ phoneNumber, password });

    // localStorage.setItem(storageKey.AUTHENTICATE_TOKEN, response.payload.token);
    localStorage.setItem(storageKey.AUTHENTICATE_TOKEN, fakeToken);

    yield put({
      type: LOGIN_SUCCESS,
    });

    // showSuccess(response.message);
    showSuccess('Login successful');

    axiosClient.defaults.headers.Authorization = `Bearer ${fakeToken}`;
    yield put({
      type: GET_ME,
      payload,
    });

    history.push(LOCATIONS.DASHBOARD);
  } catch (error) {
    let err;

    if (error.response?.data?.errors?.length) {
      err = error.response.data.errors;
    } else {
      apiErrorHandler(error);
    }
    yield put({
      type: LOGIN_FAILED,
      payload: err,
    });
  }
}

export default function* authSaga() {
  yield takeLeading(LOGIN, login);
}
