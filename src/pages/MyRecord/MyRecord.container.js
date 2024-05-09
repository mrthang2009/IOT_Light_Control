import { connect } from 'react-redux';

import { GET_DIARY_LIST } from 'src/store/diary/actionTypes';
import { GET_EXERCISE_LIST } from 'src/store/exercise/actionTypes';

import MyRecord from './MyRecord';

const mapStateToProps = (state) => ({
  loading: state.Diary.loading,
  loadingExercise: state.Exercise.loading,

  diaryList: state.Diary.diaryList,
  exerciseList: state.Exercise.exerciseList,
});

const mapDispatchToProps = (dispatch) => ({
  actionGetDiaryList: (payload) =>
    dispatch({
      type: GET_DIARY_LIST,
      payload,
    }),

  actionGetExerciseList: (payload) =>
    dispatch({
      type: GET_EXERCISE_LIST,
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecord);
