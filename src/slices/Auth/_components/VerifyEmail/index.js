import React from 'react';
import PropTypes from 'prop-types';

import { sendEmailVerification, applyActionCode } from 'utils/auth'
import { email as emailMessaging, authErrors, unexpected } from '../../messaging'

import { PageTitle } from '+dumb/Headers'
import { Pop } from '+dumb/Modals'
import Button from '+dumb/Button'

export default class extends React.Component {
  state = {
    msg: 'Would you please do us a solid and confirm your email address?',
    title: 'One More Thing'
  }

  static propTypes = {
    continueUrl: PropTypes.string,
    oobCode: PropTypes.string
  }

  componentDidMount() {
    document.title = 'Email Verification | Murder with Friends';

    if (this.props.oobCode) {
      applyActionCode(this.props.oobCode)
        .then(resp => this.setState({success: true}))
        .catch(e => this.setState({title: 'Oh darn', msg: authErrors(e)}))
    }
  }

  handleSendEmail = () => {
    sendEmailVerification()
      .then(() => {
        this.setState({msg: emailMessaging.sent, title: 'Email Deployed'})

        if (this.props.continueUrl) {
          setTimeout(() => window.location = this.props.continueUrl, 5000);
        }
      })
      .catch(e => this.setState({msg: unexpected, title: 'Oh darn'}));
  }

  render() {
    return (
      <Pop onClose={() => {}} showClose={false} className="-padded">
        <PageTitle title={this.state.title}>
          {this.state.msg}
        </PageTitle>

        <Button component="div" onClick={this.handleSendEmail}>Resend Verification Email</Button>
      </Pop>
    );
  }
};
