import { GET_COLUMN_LIST, GET_COLUMN_LIST_FAILED, GET_COLUMN_LIST_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  columnList: [],
};

const column = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLUMN_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_COLUMN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        columnList: [...state.columnList, ...action.payload],
      };
    case GET_COLUMN_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default column;
