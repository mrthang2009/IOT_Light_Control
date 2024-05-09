import PropTypes from 'prop-types';
import React, { useRef, useEffect, useCallback } from 'react';

import images from 'src/assets';

import Button from 'src/components/Button/Button';
import Diary from 'src/components/MyRecord/Diary';
import Exercise from 'src/components/MyRecord/Exercise';
import BodyRecord from 'src/components/MyRecord/BodyRecord';

import styles from './MyRecord.module.scss';

const TABS = {
  BODY_RECORD: 'BODY_RECORD',
  MY_EXERCISE: 'MY_EXERCISE',
  MY_DIARY: 'MY_DIARY',
};

const TAB_LIST = [
  {
    code: TABS.BODY_RECORD,
    title: 'BODY RECORD',
    label: '自分のカラダの記録',
    image: images.myRecommend1,
  },
  {
    code: TABS.MY_EXERCISE,
    title: 'MY EXERCISE',
    label: '自分の運動の記録',
    image: images.myRecommend2,
  },
  {
    code: TABS.MY_DIARY,
    title: 'MY DIARY',
    label: '自分の日記',
    image: images.myRecommend3,
  },
];

function MyRecord(props) {
  const { loading, diaryList, exerciseList, actionGetDiaryList, actionGetExerciseList } = props;

  const bodyRecordRef = useRef(null);
  const exerciseRef = useRef(null);
  const diaryRef = useRef(null);

  const onScrollNavigation = useCallback((e) => {
    switch (e.currentTarget.name) {
      case TABS.BODY_RECORD:
        bodyRecordRef.current.scrollIntoView({ behavior: 'smooth' });
        break;

      case TABS.MY_EXERCISE:
        exerciseRef.current.scrollIntoView({ behavior: 'smooth' });
        break;

      case TABS.MY_DIARY:
        diaryRef.current.scrollIntoView({ behavior: 'smooth' });
        break;

      default:
        break;
    }
  }, []);

  const getData = useCallback(() => {
    actionGetDiaryList();
  }, [actionGetDiaryList]);

  useEffect(() => {
    getData();

    actionGetExerciseList();
  }, [actionGetExerciseList, getData]);

  return (
    <div className="container-lg">
      <div className={styles.Tabs}>
        {TAB_LIST.map((tab) => (
          <button
            type="button"
            key={tab.code}
            className={styles.Tabs__Item}
            onClick={onScrollNavigation}
            name={tab.code}
          >
            <img className={styles.Tabs__Item__Image} src={tab.image} alt="tab" />

            <div className={styles.Tabs__Item__Content}>
              <h2 className={styles.Tabs__Item__Title}>{tab.title}</h2>

              <h4 className={styles.Tabs__Item__Label}>{tab.label}</h4>
            </div>
          </button>
        ))}
      </div>

      <section className={styles.BodyRecord} ref={bodyRecordRef}>
        <BodyRecord />
      </section>

      <section className={styles.Exercise} ref={exerciseRef}>
        <Exercise exerciseList={exerciseList} />
      </section>

      <section className={styles.Diary} ref={diaryRef}>
        <Diary diaryList={diaryList} />
      </section>

      <div className={styles.Button}>
        <Button name="自分の日記をもっと見る" loading={loading} onClick={getData} />
      </div>
    </div>
  );
}

MyRecord.propTypes = {
  actionGetDiaryList: PropTypes.func.isRequired,

  actionGetExerciseList: PropTypes.func.isRequired,
  diaryList: PropTypes.instanceOf(Array).isRequired,

  exerciseList: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MyRecord;
