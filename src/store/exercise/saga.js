// eslint-disable-next-line import/no-extraneous-dependencies
import { put, takeLeading } from 'redux-saga/effects';

import exerciseApi from 'src/api/exerciseApi';

import {
  GET_EXERCISE_LIST,
  GET_EXERCISE_LIST_FAILED,
  GET_EXERCISE_LIST_SUCCESS,
} from './actionTypes';

function* getExerciseList({ payload }) {
  try {
    const response = yield exerciseApi.getExerciseList(payload);

    yield put({
      type: GET_EXERCISE_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_EXERCISE_LIST_FAILED,
    });
  }
}

export default function* exerciseSaga() {
  yield takeLeading(GET_EXERCISE_LIST, getExerciseList);
}
