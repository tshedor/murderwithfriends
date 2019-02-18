import * as React from 'react'

import classNames from 'classnames'

import styles from './styles.css';

type PresenterProps = {
  msg: string
  error: boolean
};

const Presenter = ({msg, error=false}: PresenterProps) => {
  if (!msg) {
    return null;
  }

  return (
    <div className={classNames(styles.root, { [styles.error]: error })} role="alert">
      {msg}
    </div>
  );
};

export default Presenter;
