import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { register, sendEmailVerification } from 'utils/auth';
import { updateCurrentUserAccount } from 'actions/auth';
import { authErrors } from 'constants/messaging';

import { PageTitle } from 'components/Headers';
import { TextInput, EmailInput, PasswordInput } from 'components/Modules/Inputs';
import { FullWithTitle } from 'components/Layouts';

export default class extends React.Component {
  state = {
    errorMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    register(this.email.value, this.password.value)
      .then(user => {
        updateCurrentUserAccount({ displayName: this.displayName.value });

        return sendEmailVerification();
      })

      .catch(e => this.setState({errorMsg: authErrors(e) }));
  }

  render () {
    return (
      <FullWithTitle>
        <PageTitle title="Sign Up">
          Always good to see a fresh email.<br />Been here before? <Link to="/login">Login here</Link>.
        </PageTitle>

        <form onSubmit={this.handleSubmit}>
          { this.state.errorMsg &&
            <div className="notice -error" role="alert">
              {this.state.errorMsg}
            </div>
          }

          <TextInput
            label="Name"
            placeholder="The Better Half"
            required={true}
            inputRef={val => this.displayName = val} />
          <EmailInput
            label="Email"
            placeholder="whatever@whatever.com"
            required={true}
            inputRef={val => this.email = val} />
          <PasswordInput
            label="Password"
            required={true}
            inputRef={val => this.password = val} />

          <input type="submit" value="Sign Up" className="button -right" />
        </form>
      </FullWithTitle>
    );
  }
}
