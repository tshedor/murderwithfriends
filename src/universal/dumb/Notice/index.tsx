import * as React from 'react'

import classNames from 'classnames'

const styles = require('./styles.scss');

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
