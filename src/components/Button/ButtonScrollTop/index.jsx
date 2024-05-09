import React, { memo, useCallback } from 'react';
import { ReactComponent as GoToTopIcon } from 'assets/icons/go_top.svg';

import styles from './ButtonScrollTop.module.scss';

function ButtonScrollTop() {
  const onScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button type="button" className={`${styles.Button}`} onClick={onScrollToTop}>
      <GoToTopIcon />
    </button>
  );
}

export default memo(ButtonScrollTop);
