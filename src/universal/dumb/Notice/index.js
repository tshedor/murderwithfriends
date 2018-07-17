import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import styles from './styles.scss'

const Presenter = ({msg, error=false}) => {
  if (!msg) {
    return null;
  }

  return (
    <div className={classNames(styles.root, { [styles.error]: error })} role="alert">
      {msg}
    </div>
  );
};

Presenter.propTypes = {
  msg: PropTypes.string,
  error: PropTypes.bool
};

export default Presenter;
