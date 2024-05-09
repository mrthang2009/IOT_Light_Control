import { put, takeLeading } from 'redux-saga/effects';

import columnApi from 'src/api/columnApi';

import { GET_COLUMN_LIST, GET_COLUMN_LIST_FAILED, GET_COLUMN_LIST_SUCCESS } from './actionTypes';

function* getColumnList({ payload }) {
  try {
    const response = yield columnApi.getColumnList(payload);

    yield put({
      type: GET_COLUMN_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_COLUMN_LIST_FAILED,
    });
  }
}

export default function* columnSaga() {
  yield takeLeading(GET_COLUMN_LIST, getColumnList);
}
