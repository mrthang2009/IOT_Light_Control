import authApi from 'api/authApi';
import { put, takeLeading } from 'redux-saga/effects';
import { apiErrorHandler, showSuccessTrans, removeSpacesWithTrim } from 'utils';

import { LOCATIONS } from 'src/constants';

import { REGISTER } from './actionTypes';
import { actionRegisterFailed, actionRegisterSuccess } from './actions';

function* register({ payload }) {
  try {
    const {
      values: { firstName, middleName, lastName, email, password, confirmPassword },

      history,
    } = payload;

    const registerData = removeSpacesWithTrim({
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    const response = yield authApi.register({ registerData });

    yield put(actionRegisterSuccess(response.user));

    history.push(LOCATIONS.LOGIN);

    showSuccessTrans({ name: 'register.title' });
  } catch (error) {
    let errors;

    if (error.response?.data?.errors?.length) {
      errors = error.response?.data?.errors;
    } else {
      apiErrorHandler(error);
    }

    yield put(actionRegisterFailed(errors));
  }
}

export default function* accountSaga() {
  yield takeLeading(REGISTER, register);
}
