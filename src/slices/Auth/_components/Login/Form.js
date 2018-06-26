import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login } from 'utils/auth';
import { login as loginMessaging } from '../../messaging';

import { EmailInput, PasswordInput } from '+dumb/Inputs';
import { Content } from '+dumb/Layouts'
import Button from '+dumb/Button'

export default class extends React.Component {
  state = {
    errorMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    login(this.email.value, this.password.value)
      .catch(error => this.setState({errorMsg: loginMessaging(error)}) );
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className="endcap">
        { this.state.errorMsg &&
          <div className="notice -error" role="alert">
            {this.state.errorMsg}
          </div>
        }

        <Content title="Email">
          <EmailInput
            placeholder="goingtomurder@withmyfriends.com"
            inputRef={val => this.email = val} />
        </Content>

        <Content title="Password">
          <PasswordInput
            inputRef={val => this.password = val} />
            <Link to="/forgot-password" className="alert-link">Forgot Password?</Link>
        </Content>

        <Button value="Login" />
      </form>
    );
  }
}
