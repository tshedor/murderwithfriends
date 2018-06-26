import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { register, sendEmailVerification } from 'utils/auth';
import { updateCurrentUserAccount } from './actions';
import { authErrors } from '../../messaging';

import { PageTitle, Helper } from '+dumb/Headers';
import { TextInput, EmailInput, PasswordInput } from '+dumb/Inputs';
import { Content } from '+dumb/Layouts';
import Button from '+dumb/Button'


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
      <React.Fragment>
        <PageTitle title="Sign Up">
          <Helper>Always good to see a fresh email.<br />Been here before? <Link to="/login">Login here</Link>.</Helper>
        </PageTitle>

        <form onSubmit={this.handleSubmit}>
          { this.state.errorMsg &&
            <div className="notice -error" role="alert">
              {this.state.errorMsg}
            </div>
          }

          <Content title="Name">
            <TextInput
              placeholder="Schmitty Werber Wegermanjensen"
              required={true}
              inputRef={val => this.displayName = val} />
          </Content>

          <Content title="Email">
            <EmailInput
              placeholder="whatever@whatever.com"
              required={true}
              inputRef={val => this.email = val} />
          </Content>

          <Content title="Password">
            <PasswordInput
              required={true}
              inputRef={val => this.password = val} />
          </Content>

          <Button value="Sign Up" />
        </form>
      </React.Fragment>
    );
  }
}
