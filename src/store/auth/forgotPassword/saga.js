import authApi from 'api/authApi';
import { put, takeLeading } from 'redux-saga/effects';
import { apiErrorHandler, showSuccessTrans, removeSpacesWithTrim } from 'utils';

import { LOCATIONS } from 'src/constants';

import { FORGOT_PASSWORD } from './actionTypes';
import { actionForgotPasswordFailed, actionForgotPasswordSuccess } from './actions';

function* forgotPassword({ payload }) {
  try {
    const { user, history } = payload;

    const passwordData = removeSpacesWithTrim(user);

    yield authApi.forgotPassword({ passwordData });

    yield put(actionForgotPasswordSuccess());

    history.push(LOCATIONS.LOGIN);

    showSuccessTrans({ name: 'send_email' });
  } catch (error) {
    apiErrorHandler(error.response.data);
    yield put(actionForgotPasswordFailed(error.response.data));
  }
}

export default function* forgotPasswordSaga() {
  yield takeLeading(FORGOT_PASSWORD, forgotPassword);
}
