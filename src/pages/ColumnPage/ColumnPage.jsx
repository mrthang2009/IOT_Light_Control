import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useCallback } from 'react';

import Button from 'src/components/Button/Button';
import MyColumnCard from 'src/components/MyColumnCard';

import styles from './ColumnPage.module.scss';

const RECOMMEND_LIST = [
  {
    id: uuidv4(),
    title: 'RECOMMENDED COLUMN',
    desc: 'オススメ',
  },
  {
    id: uuidv4(),
    title: 'RECOMMENDED DIET',
    desc: 'ダイエット',
  },
  {
    id: uuidv4(),
    title: 'RECOMMENDED BEAUTY',
    desc: '美容',
  },
  {
    id: uuidv4(),
    title: 'RECOMMENDED HEALTH',
    desc: '健康',
  },
];

function ColumnPage(props) {
  const { loading, columnList, actionGetColumnList } = props;

  const getData = useCallback(() => {
    actionGetColumnList();
  }, [actionGetColumnList]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="container-lg">
      <div className={styles.Recommend}>
        {RECOMMEND_LIST.map((item) => (
          <div key={item.id} className={styles.Recommend__Item}>
            <h2 className={styles.Title}>{item.title}</h2>

            <div className={styles.Line} />

            <p className={styles.Description}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.Column}>
        {columnList.length > 0 &&
          columnList.map((item) => {
            return (
              <MyColumnCard
                key={item.id}
                title={item.title}
                image={item.image}
                tags={item.tags}
                timeStamp={item.timeStamp}
              />
            );
          })}
      </div>

      <div className={styles.Button}>
        <Button name="コラムをもっと見る" loading={loading} onClick={getData} />
      </div>
    </div>
  );
}

ColumnPage.propTypes = {
  actionGetColumnList: PropTypes.func.isRequired,

  columnList: PropTypes.instanceOf(Array).isRequired,

  loading: PropTypes.bool.isRequired,
};

export default ColumnPage;
