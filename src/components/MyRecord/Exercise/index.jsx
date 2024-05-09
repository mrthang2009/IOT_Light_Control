import React from 'react';
import PropTypes from 'prop-types';

import { convertIsoDateToString } from 'src/utils';

import ExerciseItem from './ExerciseItem';
import styles from './Exercise.module.scss';

function Exercise(props) {
  const { exerciseList } = props;

  return (
    <div className={styles.Exercise}>
      <h3 className={styles.Exercise__title}>MY EXERCISE</h3>

      <h4 className={styles.Exercise__Time}>{convertIsoDateToString(new Date())}</h4>

      <div className={styles.Table}>
        {exerciseList.length > 0 &&
          exerciseList.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              calorie={exercise.calorie}
              duration={exercise.duration}
              title={exercise.title}
            />
          ))}
      </div>
    </div>
  );
}

Exercise.propTypes = {
  exerciseList: PropTypes.instanceOf(Array).isRequired,
};

export default Exercise;
