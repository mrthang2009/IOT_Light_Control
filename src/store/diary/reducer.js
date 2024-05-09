import { GET_DIARY_LIST, GET_DIARY_LIST_FAILED, GET_DIARY_LIST_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  diaryList: [],
};

const diary = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIARY_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_DIARY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        diaryList: [...state.diaryList, ...action.payload],
      };
    case GET_DIARY_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default diary;
