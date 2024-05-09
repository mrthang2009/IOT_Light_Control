import React from 'react';
import PropTypes from 'prop-types';

import { convertIsoDateToString } from 'src/utils';

import styles from './MealHistoryItem.module.scss';

function MealHistoryItem(props) {
  const { image, timeStamp, meal } = props;

  return (
    <div className={styles.Meal}>
      <img src={image} alt="meal" className={styles.Meal__Image} />
      <div className={styles.Meal__Label}>
        {`${convertIsoDateToString(timeStamp, 'MM.DD')}.${meal}`}
      </div>
    </div>
  );
}

MealHistoryItem.propTypes = {
  image: PropTypes.string,
  meal: PropTypes.string,
  timeStamp: PropTypes.string,
};

MealHistoryItem.defaultProps = {
  image: '',
  meal: '',
  timeStamp: '',
};

export default MealHistoryItem;
