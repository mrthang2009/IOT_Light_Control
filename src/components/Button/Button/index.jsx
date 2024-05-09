import PropTypes from 'prop-types';
import React, { memo } from 'react';

import styles from './AppButton.module.scss';

function AppButton(props) {
  const {
    loading,

    name,

    onClick,
  } = props;

  return (
    <button type="button" className={`${styles.Button}`} onClick={onClick}>
      {loading ? 'Loading...' : name}
    </button>
  );
}

AppButton.propTypes = {
  loading: PropTypes.bool,

  name: PropTypes.string,

  onClick: PropTypes.func,
};

AppButton.defaultProps = {
  loading: false,

  name: '',

  onClick: () => {},
};

export default memo(AppButton);
