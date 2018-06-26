import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { checkActionCode, applyActionCode } from 'utils/auth';
import { authErrors, email as emailMessaging } from '../../messaging';

import { PageTitle } from '+dumb/Headers';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offerReset: false,
      offerVerify: false,
      title: props.recover ? 'Recover Email' : 'Verify Email',
      msg: props.recover ? "We'll have you back to your email in no time." : 'Looks like you got our message.'
    };
  }

  static propTypes = {
    oobCode: PropTypes.string.isRequired,
    continueUrl: PropTypes.string,
    recover: PropTypes.bool
  }

  static defaultProps = {
    continueUrl: null,
    recover: false
  }

  componentDidMount() {
    checkActionCode(this.props.oobCode)
      .then(info => {
        this.setState({email: info.data.email, title: 'Verifying...'});
        return applyActionCode(this.props.oobCode);
      })
      .then(() => {
        this.setState({msg: emailMessaging.validate(this.state.email), title: 'Email Confirmed', offerReset: true})
        const new_location = this.props.continueUrl || '/login';

        setTimeout(() => window.location = new_location, 6000);
      })
      .catch(e =>
        this.setState({
          msg: authErrors(e, 'Please verify your email again.'),
          offerReset: this.props.recover,
          offerVerify: !this.props.recover,
          title: 'Oh darn'
        })
      );
  }

  render() {
    return (
      <PageTitle title={this.state.title}>
        {this.state.msg}
        {this.state.offerReset &&
          <span>&nbsp; If you think your account was compromised, you should also <Link to="/reset-password">reset your password</Link>.</span>
        }

        {this.state.offerVerify &&
          <Link to="/verify-email">&nbsp;Try verifying again here.</Link>
        }
      </PageTitle>
    );
  }
};
