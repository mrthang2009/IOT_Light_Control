import PropTypes from 'prop-types';
import React, { memo } from 'react';

function AppLoading(props) {
  const { loading, loaderOnPage } = props;

  return (
    loading && (
      <div id="preloader" className={loaderOnPage ? 'is__loader' : ''}>
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>
    )
  );
}

AppLoading.propTypes = {
  loaderOnPage: PropTypes.bool,
  loading: PropTypes.bool,
};

AppLoading.defaultProps = {
  loading: false,
  loaderOnPage: false,
};

export default memo(AppLoading);
