import React from 'react';

import queryString from 'query-string';

import { login, updatePassword } from 'utils/auth';
import { login as loginMessaging, password as passwordMessaging } from '../../messaging';

import { PageTitle } from '+dumb/Headers';
import { PasswordInput } from '+dumb/Inputs';
import Button from '+dumb/Button'

const invitedMessaging = {
  emailNotFound: "You haven't been invited to use Murder with Friends. Please make sure you have the right email address.",
  welcome: 'Welcome to Murder with Friends.com. Create a password below and let the party begin.',
  waitForLogin: "We're straightening up the house before you come in."
}

export default class extends React.Component {
  state = {
    errorMsg: null,
    authed: false
  }

  componentDidMount() {
    const { e, p } = queryString.parse(window.location.search);

    if (!e || !p) {
      return this.props.history.push('/my-narratives');
    }

    document.title = 'Welcome | Murder with Friends'

    login(decodeURIComponent(e), p)
      .then(() => this.setState({authed: true}))
      .catch(e =>  {
        if (e.code === 'auth/user-not-found') {
          this.setState({ errorMsg: invitedMessaging.emailNotFound })
        }
      });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.password.value !== this.password_confirmation.value) {
      return this.setState({ errorMsg: passwordMessaging.mismatch });
    }

    updatePassword(this.password.value)
      .then(() => this.props.history.push('/my-narratives/agenda'))
      // TODO handle recent login error here
      .catch(e => this.setState({errorMsg: loginMessaging(e) }));
  }

  render() {
    if (!this.state.authed) {
      return (
        <PageTitle title={this.state.errorMsg ? 'Sorry, Pal' : 'Please Hold'}>
          {this.state.errorMsg || invitedMessaging.waitForLogin}
        </PageTitle>
      );
    }

    return (
      <React.Fragment>
        <PageTitle title="Hallo!">
          {invitedMessaging.welcome}
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

          <Button value="Let's Go" />
        </form>
      </React.Fragment>
    );
  }
}
