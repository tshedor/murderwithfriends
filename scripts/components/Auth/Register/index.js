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

        analytics.identify(user.uid, {
          createdAt: moment.utc().format(),
          name: this.displayName.value,
          email: user.email,
          phone: user.phoneNumber,
          avatar: user.photoURL
        });

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
            placeholder="goingtothechapel@andimgoingtowedfuly.com"
            required={true}
            inputRef={val => this.email = val} />
          <PasswordInput
            label="Password"
            required={true}
            inputRef={val => this.password = val} />

          <small>By signing up, you agree to the Murder with Friends (operated by Feiern LLC)<br /><a href="https://wedfuly.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="https://wedfuly.com/privacy-policy">Privacy Policy</a>.</small>
          <br />
          <br />
          <input type="submit" value="Sign Up" className="button -right" />
        </form>
      </FullWithTitle>
    );
  }
}
