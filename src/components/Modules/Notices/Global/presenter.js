import React from 'react';
import PropTypes from 'prop-types';

let timer;

export default class extends React.Component {
  static propTypes = {
    notice: PropTypes.shape({
      msg: PropTypes.string,
      duration: PropTypes.number,
      severity: PropTypes.string
    }).isRequired,
    onDismiss: PropTypes.func.isRequired
  }

  componentWillReceiveProps({ notice }) {
    if (!notice.msg) return;

    clearTimeout(timer);

    if (notice.duration !== -1) {
      timer = setTimeout(this.props.onDismiss, notice.duration);
    }
  }

  handleDismiss = () => {
    clearTimeout(timer);
    this.props.onDismiss();
  }

  render() {
    const { severity, msg } = this.props.notice;
    const severity_class = severity ? `-${severity}` : '';

    if (!msg) {
      return null;
    }

    return (
      <div className={`notice -global ${severity_class}`} onClick={this.handleDismiss} role="alert">
        {msg}
      </div>
    );
  }
};
