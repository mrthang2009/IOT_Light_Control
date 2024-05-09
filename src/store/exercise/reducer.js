/* eslint-disable default-param-last */
import {
  GET_EXERCISE_LIST,
  GET_EXERCISE_LIST_FAILED,
  GET_EXERCISE_LIST_SUCCESS,
} from './actionTypes';

const initialState = {
  loading: false,
  exerciseList: [],
};

const exercise = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXERCISE_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_EXERCISE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        exerciseList: action.payload,
      };
    case GET_EXERCISE_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default exercise;
