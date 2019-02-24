import React from 'react'
import PropTypes from 'prop-types'

import { PageTitle } from 'components/Headers'

export const FullWithTitle = ({children}) => (
  <div>
    {children}
  </div>
);

FullWithTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};
