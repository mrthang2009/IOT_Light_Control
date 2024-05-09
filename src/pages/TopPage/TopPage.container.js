import { connect } from 'react-redux';

import { GET_MEAL_LIST } from 'src/store/meal/actionTypes';

import TopPage from './TopPage';

const mapStateToProps = (state) => ({
  loading: state.Meal.loading,

  mealList: state.Meal.mealList,
});

const mapDispatchToProps = (dispatch) => ({
  actionGetMealList: (payload) =>
    dispatch({
      type: GET_MEAL_LIST,
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopPage);
