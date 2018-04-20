import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login } from 'utils/auth';
import { login as loginMessaging } from 'constants/messaging';

import { EmailInput, PasswordInput } from 'components/Modules/Inputs';

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

        <EmailInput
          label="Email"
          placeholder="goingtomurder@withmyfriends.com"
          inputRef={val => this.email = val} />
        <PasswordInput
          label="Password"
          inputRef={val => this.password = val} />
        <div className="row">
          <div className="column">
            <Link to="/forgot-password" className="alert-link">Forgott Password?</Link>
          </div>
          <div className="column">
            <input type="submit" value="Login" className="button -right" />
          </div>
        </div>
      </form>
    );
  }
}
