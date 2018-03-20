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
      <Transition component={false}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}>

        <section key="modal" className={`modal -pop ${this.props.className ? this.props.className : ''}`} onClick={onClose}>

          <Transition
            component={false}
            enter={{ scale: spring(1, {stiffness: 300, damping: 20})}}
            leave={{scale: 0.5}}>

            <div key="modal_content" className="modal-content" onClick={onContentClick}>
              {children}
              {showClose &&
                <div className="modal-close" onClick={onClose}>
                  <Icon name="close" label="Exit" />
                </div>
              }
            </div>

          </Transition>

        </section>

      </Transition>
    );
  }
}
