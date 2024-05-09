import { put, takeLeading } from 'redux-saga/effects';

import diaryApi from 'src/api/diaryApi';

import { GET_DIARY_LIST, GET_DIARY_LIST_FAILED, GET_DIARY_LIST_SUCCESS } from './actionTypes';

function* getDiaryList({ payload }) {
  try {
    const response = yield diaryApi.getDiaryList(payload);

    yield put({
      type: GET_DIARY_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_DIARY_LIST_FAILED,
    });
  }
}

export default function* diarySaga() {
  yield takeLeading(GET_DIARY_LIST, getDiaryList);
}
