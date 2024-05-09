import React from 'react';
import PropTypes from 'prop-types';

import { convertIsoDateToString } from 'src/utils';

import styles from './Diary.module.scss';

function DiaryItem(props) {
  const { timeStamp, subTitle, content } = props;

  return (
    <div className={styles.Diary__List__Item}>
      <div className={styles.Diary__TimeBox}>
        <div className={styles.Diary__TimeBox__Time}>{convertIsoDateToString(timeStamp)}</div>

        <div className={styles.Diary__TimeBox__Time}>
          {convertIsoDateToString(timeStamp, 'HH:mm')}
        </div>
      </div>

      <div className={styles.Diary__Content}>
        <p>{subTitle}</p>

        <p>{content}</p>
      </div>
    </div>
  );
}

DiaryItem.propTypes = {
  content: PropTypes.string,
  subTitle: PropTypes.string,
  timeStamp: PropTypes.string,
};

DiaryItem.defaultProps = {
  timeStamp: '',
  subTitle: '',
  content: '',
};

export default DiaryItem;
