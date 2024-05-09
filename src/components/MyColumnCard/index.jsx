import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import React, { useMemo } from 'react';

import { convertIsoDateToString } from 'src/utils';

import styles from './MyColumnCard.module.scss';

export default function MyColumnCard(props) {
  const { title, image, timeStamp, tags } = props;

  const tagsArray = useMemo(() => {
    return tags.slice(0, 3).map((tag) => ({
      label: tag,
      id: uuidv4(),
    }));
  }, [tags]);

  return (
    <div className={styles.Card}>
      <div className={styles.ImageGroup}>
        <img src={image} alt="heathy" className={styles.ImageGroup__Image} />

        <div className={styles.ImageGroup__TimeStamp}>
          <div className={styles.ImageGroup__TimeStamp__Text}>
            {convertIsoDateToString(timeStamp)}
          </div>
          <div className={styles.ImageGroup__TimeStamp__Text}>
            {convertIsoDateToString(timeStamp, 'HH:mm')}
          </div>
        </div>
      </div>

      <div className={styles.Info}>
        <div className={styles.Info__Title}>{title}</div>

        <div className={styles.Info__Tags}>
          {tagsArray.map((tag) => (
            <div key={tag.id} className={styles.Info__Tags__Item}>
              #{tag.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

MyColumnCard.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.instanceOf(Array),
  timeStamp: PropTypes.string,

  title: PropTypes.string,
};

MyColumnCard.defaultProps = {
  image: '',
  timeStamp: '',
  title: '',

  tags: [],
};
