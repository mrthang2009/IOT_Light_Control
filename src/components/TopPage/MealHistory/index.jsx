import React from 'react';
import PropTypes from 'prop-types';

import MealHistoryItem from './MealHistoryItem';

function MealHistory(props) {
  const { mealList } = props;

  return (
    mealList.length > 0 &&
    mealList.map((meal) => (
      <MealHistoryItem
        key={meal.id}
        image={meal.image}
        timeStamp={meal.timeStamp}
        meal={meal.meal}
      />
    ))
  );
}

MealHistory.propTypes = {
  mealList: PropTypes.instanceOf(Array).isRequired,
};

export default MealHistory;
