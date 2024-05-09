import React from 'react';
import PropTypes from 'prop-types';

import styles from './Exercise.module.scss';

function ExerciseItem(props) {
  const { title, calorie, duration } = props;

  return (
    <div className={styles.CellData}>
      <div className={styles.CellData__Left}>
        <svg
          className={styles.CellData__Left__Icon}
          width="5"
          height="6"
          viewBox="0 0 5 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 0.91C1.96 0.91 1.42 1.12 1.03 1.475C0.555 1.91 0.305 2.47 0.305 3.1C0.305 4.31 1.29 5.295 2.5 5.295C3.71 5.295 4.69 4.315 4.69 3.1C4.69 2.555 4.49 2.035 4.125 1.635C3.7 1.165 3.13 0.91 2.5 0.91Z"
            fill="white"
          />
        </svg>

        <div>
          <div className={styles.CellData__Title}>{title}</div>

          <div className={styles.CellData__Calorie}>{calorie}kcal</div>
        </div>
      </div>

      <div className={styles.CellData__Duration}>{duration} min</div>
    </div>
  );
}

ExerciseItem.propTypes = {
  calorie: PropTypes.number,
  duration: PropTypes.number,
  title: PropTypes.string,
};

ExerciseItem.defaultProps = {
  calorie: 0,
  duration: 0,
  title: '',
};

export default ExerciseItem;
