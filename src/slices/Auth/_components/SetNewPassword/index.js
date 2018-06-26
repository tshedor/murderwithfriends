import React from 'react';
import PropTypes from 'prop-types';

import { login, confirmPasswordReset, verifyPasswordResetCode } from 'utils/auth';
import {password as passwordMessaging, authErrors } from '../../messaging';

import { PageTitle } from '+dumb/Headers';
import { PasswordInput } from '+dumb/Inputs';
import Button from '+dumb/Button';

export default class extends React.Component {
  state = {
    errorMsg: null,
    validCode: false,
    email: null,
    success: false
  }

  static propTypes = {
    oobCode: PropTypes.string.isRequired,
    continueUrl: PropTypes.string
  }

  static defaultProps = {
    continueUrl: '/my-narratives'
  }

  componentDidMount() {
    verifyPasswordResetCode(this.props.oobCode)
      .then(email => this.setState({ validCode: true, email: email }))
      .catch(e => this.setState({errorMsg: authErrors(e, 'Please reset your password again.') }));
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.password.value !== this.password_confirmation.value) {
      return this.setState({ errorMsg: passwordMessaging.mismatch});
    }

    confirmPasswordReset(this.props.oobCode, this.password.value)
      .then(resp => {
        this.setState({ success: true });
        setTimeout(() => {
          login(this.state.email, this.password.value)
            .then(() => window.location = this.props.continueUrl)
            .catch(e => this.setState({errorMsg: authErrors(e)}));
        }, 5000);
      })
      .catch(e => this.setState({errorMsg: authErrors(e)}));
  }

  render() {
    if (this.state.success) {
      return (
        <PageTitle title="You did it!">
          {passwordMessaging.success}
        </PageTitle>
      );
    }

    return (
      <React.Fragment>
        <PageTitle title="Set New Password">
          {passwordMessaging.new_helper}
        </PageTitle>

        <form onSubmit={this.handleSubmit}>
          <PasswordInput
            label="Password"
            onKeyDown={() => this.setState({ errorMsg: null }) }
            inputRef={val => this.password = val} />
          <PasswordInput
            label="Confirm Password"
            onKeyDown={() => this.setState({ errorMsg: null }) }
            inputRef={val => this.password_confirmation = val}
            error={this.state.errorMsg} />

          <Button value="Reset" />
        </form>
      </React.Fragment>
    );
  }
}
