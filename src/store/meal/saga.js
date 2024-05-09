import { put, takeLeading } from 'redux-saga/effects';

import mealApi from 'src/api/mealApi';

import { GET_MEAL_LIST, GET_MEAL_LIST_FAILED, GET_MEAL_LIST_SUCCESS } from './actionTypes';

function* getMealList({ payload }) {
  try {
    const response = yield mealApi.getMealList(payload);

    yield put({
      type: GET_MEAL_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_MEAL_LIST_FAILED,
    });
  }
}

export default function* mealSaga() {
  yield takeLeading(GET_MEAL_LIST, getMealList);
}
