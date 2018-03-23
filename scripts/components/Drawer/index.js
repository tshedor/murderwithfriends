import React from 'react'
import PropTypes from 'prop-types'

const Presenter = ({ open, title, toggleOpen, children }) => (
  <div className="drawer">
    <h3 onClick={() => toggleOpen(!open)}>{title}</h3>

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

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
