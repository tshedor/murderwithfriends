import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'

const Presenter = ({ open, title, toggleOpen, children }) => (
  <div className={`drawer ${open ? '-open' : ''}`}>
    <header>
      <h2 onClick={() => toggleOpen(!open)}>
        <Icon name={open ? 'down' : 'right'} />{title}
      </h2>
    </header>

    {open &&
      children
    }
  </div>
);

Presenter.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

Presenter.displayName = __dirname.replace('src/components/', '');
export default Presenter;