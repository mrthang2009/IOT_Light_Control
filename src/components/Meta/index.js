import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { MetaTags } from 'react-meta-tags';

function Meta(props) {
  const { name } = props;

  return (
    <MetaTags>
      <meta charSet="utf-8" />

      <title>{name}</title>
    </MetaTags>
  );
}

Meta.propTypes = {
  name: PropTypes.string,
};

Meta.defaultProps = {
  name: '',
};

export default memo(Meta);
