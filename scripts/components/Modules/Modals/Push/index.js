import React from 'react';
import PropTypes from 'prop-types';

import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';

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
    children: PropTypes.element
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
      <Transition
        component={false}
        enter={{ translateX: spring(0, {stiffness: 300, damping: 20})}}
        leave={{ translateX: 300 }}>

        <div
          key="modal_content"
          className={`modal -pusher ${this.props.className ? this.props.className : ''}`}
          onClick={onContentClick}>

          {showClose &&
            <div className="modal-close" onClick={onClose}>
              <Icon name="close" label="Exit" />
            </div>
          }

          <div className="modal-content">
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}
