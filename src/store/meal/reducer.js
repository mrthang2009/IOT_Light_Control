/* eslint-disable default-param-last */
import { GET_MEAL_LIST, GET_MEAL_LIST_FAILED, GET_MEAL_LIST_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  mealList: [],
};

const meal = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEAL_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_MEAL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        mealList: [...state.mealList, ...action.payload],
      };
    case GET_MEAL_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default meal;
