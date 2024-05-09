import React from 'react';
import PropTypes from 'prop-types';

import DiaryItem from './DiaryItem';
import styles from './Diary.module.scss';

function Diary(props) {
  const { diaryList } = props;

  return (
    <div className={styles.Diary}>
      <h3 className={styles.Diary__Title}>MY DIARY</h3>

      <div className={styles.Diary__List}>
        {diaryList.map((item) => (
          <DiaryItem
            key={item.id}
            timeStamp={item.timeStamp}
            subTitle={item.subTitle}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
}

Diary.propTypes = {
  diaryList: PropTypes.instanceOf(Array).isRequired,
};

export default Diary;
