import { all, fork } from 'redux-saga/effects';

import MealSaga from 'src/store/meal/saga';
import DiarySaga from 'src/store/diary/saga';
import ColumnSaga from 'src/store/column/saga';
import ExerciseSaga from 'src/store/exercise/saga';

export default function* rootSaga() {
  yield all([fork(ColumnSaga), fork(DiarySaga), fork(ExerciseSaga), fork(MealSaga)]);
}
