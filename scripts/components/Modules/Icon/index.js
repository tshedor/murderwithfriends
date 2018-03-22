import React from 'react';
import PropTypes from 'prop-types';

import icon from 'components/../../assets/icons.svg';

const Icon = ({name, label, ...res}) => (
  <svg className={`icon icon-${name}`} {...res} aria-labelledby="title">
    <title>{label || name}</title>
    <use xlinkHref={`${icon}#${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default Icon;
