import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

function onContentClick(e) {
  e.stopPropagation();
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.handleKeyDown;
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    showClose: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
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
    const { onClose, showClose, children } = this.props;

    return (
      <section key="modal" className={`modal -pop ${this.props.className ? this.props.className : ''}`} onClick={onClose}>
        <div key="modal_content" className="modal-content" onClick={onContentClick}>
          {children}
          {showClose &&
            <div className="modal-close" onClick={onClose}>
              <Icon name="close" label="Exit" />
            </div>
          }
        </div>
      </section>
    );
  }
}
