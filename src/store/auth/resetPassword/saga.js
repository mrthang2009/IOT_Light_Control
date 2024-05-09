// Login Redux States
import { apiErrorHandler, showSuccessTrans } from 'utils';
import { put, delay, takeLeading } from 'redux-saga/effects';

import { RESET_PASSWORD } from './actionTypes';
import { actionResetPasswordFailed, actionResetPasswordSuccess } from './actions';

// eslint-disable-next-line no-unused-vars
function* resetPassword({ payload }) {
  yield delay(1000);
  try {
    // const { user, history } = payload;
    yield put(actionResetPasswordSuccess());
    showSuccessTrans({ name: 'profile.change_password' });
  } catch (error) {
    apiErrorHandler(error);
    yield put(actionResetPasswordFailed());
  }
}

export default function* passwordSaga() {
  yield takeLeading(RESET_PASSWORD, resetPassword);
}
