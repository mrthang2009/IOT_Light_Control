import { combineReducers } from 'redux';

import Meal from 'src/store/meal/reducer';
import Diary from 'src/store/diary/reducer';
import Column from 'src/store/column/reducer';
import Exercise from 'src/store/exercise/reducer';

const rootReducer = combineReducers({
  Column,
  Diary,
  Exercise,
  Meal,
});

export default rootReducer;
