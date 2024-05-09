import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import classnames from 'utils/classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './HamburgerMenu.module.scss';

function HamburgerItem(props) {
  const { url, label } = props;

  const location = useLocation();

  const isActive = useMemo(() => {
    return location.pathname === url;
  }, [location.pathname, url]);

  return (
    <Link to={url} className={classnames('dropdown-item', isActive && styles.Active)}>
      {label}
    </Link>
  );
}

HamburgerItem.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};

HamburgerItem.defaultProps = {
  label: '',
  url: '',
};

export default HamburgerItem;
