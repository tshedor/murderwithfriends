import React from 'react'
import classNames from 'classnames'

import Icon from '../Icon'

import styles from './styles.scss';

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/universal/dumb/', '')

  render() {
    const { open, title, toggleOpen, children } = this.props;

    return (
      <div className={classNames(styles.drawer, {[styles.open]: open})}>
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
  }
};
