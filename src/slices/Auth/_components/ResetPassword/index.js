import React from 'react';

import { resetPassword } from 'utils/auth';
import { password as passwordMessaging, authErrors } from '../../messaging';

import { PageTitle } from '+dumb/Headers';
import { EmailInput } from '+dumb/Inputs';
import { SuccessErrorNotice } from '+dumb/Notices';
import Button from '+dumb/Button'

export default class extends React.Component {
  state = {
    errorMsg: null,
    successMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!this.email.value) {
      return this.setState({ errorMsg: passwordMessaging.noEmail });
    }

    resetPassword(this.email.value)
      .then(() => {
        this.setState({ successMsg: passwordMessaging.emailSent(this.email.value) });
        this.email.value = '';
      })
      .catch(e => this.setState({ errorMsg: authErrors(e) }));
  }

  render () {
    return (
      <React.Fragment>
        <PageTitle title="Reset Password">
          {passwordMessaging.reset_text}
        </PageTitle>

        <form onSubmit={this.handleSubmit}>
          <SuccessErrorNotice errorMsg={this.state.errorMsg} successMsg={this.state.successMsg} />

          <EmailInput label="Email" placeholder="fred@forgetfulfred.net" inputRef={val => this.email = val} />

          <Button value="Reset" />
        </form>
      </React.Fragment>
    )
  }
}
