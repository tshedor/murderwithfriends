import React from 'react';

import { resetPassword } from 'utils/auth';
import { password as passwordMessaging, authErrors } from 'constants/messaging';

import { PageTitle } from 'components/Headers';
import { EmailInput } from 'components/Modules/Inputs';
import { FullWithTitle } from 'components/Layouts';
import { SuccessErrorNotice } from 'components/Modules/Notices';

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
      <FullWithTitle>
        <PageTitle title="Reset Password">
          {passwordMessaging.reset_text}
        </PageTitle>

        <form onSubmit={this.handleSubmit} className="endcap">
          <SuccessErrorNotice errorMsg={this.state.errorMsg} successMsg={this.state.successMsg} />

          <EmailInput label="Email" placeholder="fred@forgetfulfred.net" inputRef={val => this.email = val} />

          <input type="submit" className="button -right" value="Reset" />
        </form>
      </FullWithTitle>
    )
  }
}
