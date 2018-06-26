import * as React from 'react';
import * as classNames from 'classnames';

import styles from './styles.scss';

import Icon from '+dumb/Icon';

function onContentClick(e) {
  e.stopPropagation();
}

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onKeyDown = this.handleKeyDown;
  }

  static defaultProps = {
    showClose: true
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { className, onClose, showClose, children } = this.props;

    return (
      <section key="modal" className={classNames(styles.modal, styles.pop, className)} onClick={onClose}>
        <div key="modal_content" className={styles.modalContent} onClick={onContentClick}>
          {children}
          {showClose &&
            <div className={styles.modalClose} onClick={onClose}>
              <Icon name="close" label="Exit" />
            </div>
          }
        </div>
      </section>
    );
  }
}
