import React from 'react';
import PropTypes from 'prop-types';

import { handleNewProfileData } from 'actions/auth';
import { deleteUser } from 'utils/auth';
import { password as passwordMessaging, authErrors } from 'constants/messaging';

import { TextInput, PasswordInput, EmailInput } from 'components/Modules/Inputs';
import { SuccessErrorNotice } from 'components/Modules/Notices';
import { LoginForm } from 'components/Auth';
import { Pop } from 'components/Modules/Modals';
import { PageTitle } from 'components/Headers';
import Icon from 'components/Modules/Icon';

const accountMessaging = {
  cancelled: 'Cancelled update',
  success: 'Successfully updated',
  deleted: 'Account deleted. We wish you all the best.',
  confirmDelete: 'This will permanently delete your account. It cannot be undone. Are you sure you want to continue?',
  reauthHelper: authErrors({ code: 'auth/requires-recent-login' })
};

export default class extends React.Component {
  state = {
    errorMsg: null,
    successMsg: null,
    requiresLogin: false,
    showNewPassword: false
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    onSetNotice: PropTypes.func.isRequired
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.password.value && this.confirm_password && this.confirm_password.value && this.password.value !== this.confirm_password.value) {
      return this.setState({errorMsg: passwordMessaging.mismatch});
    }

    let data = {
      displayName: this.displayName.value,
      email: this.email.value
    };

    if (this.confirm_password && this.confirm_password.value) {
      data.password = this.confirm_password.value;
    }

    handleNewProfileData(data)
      .then(resp => this.handleUpdateAndDismiss({successMsg: accountMessaging.success}))
      .catch(e => {
        if (e.code == 'auth/requires-recent-login') {
          this.setState({requiresLogin: true});
        }
      });
  }

  handleDelete = e => {
    if (confirm(accountMessaging.confirmDelete)) {
      deleteUser()
        .then(() => {
          this.props.onSetNotice(accountMessaging.deleted);
          this.props.history.push('/');
        })
        .catch(e => {
          if (e.code === 'auth/requires-recent-login') {
            this.setState({requiresLogin: true});
          }
        })
    }
  }

  handleUpdateAndDismiss = params => {
    this.setState(params);
    let cleared_props = {}

    Object.keys(params).forEach(key => cleared_props[key] = null);

    setTimeout(() => this.setState(cleared_props), 6000);
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <SuccessErrorNotice errorMsg={this.state.errorMsg} successMsg={this.state.successMsg} />

          <TextInput
            label="Name"
            inputRef={val => this.displayName = val}
            defaultValue={user.displayName} />

          <EmailInput
            label="Email"
            inputRef={val => this.email = val}
            defaultValue={user.email} />

          <PasswordInput
            label="Change Password"
            inputRef={val => this.password = val}
            onFocus={() => this.setState({errorMsg: null})}
            onKeyUp={e => this.setState({showNewPassword: e.currentTarget.value.length > 0})} />

          { this.state.showNewPassword &&
            <PasswordInput
              label="Confirm New Password"
              inputRef={val => this.confirm_password = val} />
          }

          <div className="row">
            <div className="column">
              <div onClick={this.handleDelete} className="button -empty -icon -destructive"><Icon name="trash" />Delete Account</div>
            </div>

            <div className="column">
              <input type="submit" className="button -right" value="Update" />
            </div>
          </div>
        </form>

        {this.state.requiresLogin &&
          <Pop onClose={() => this.handleUpdateAndDismiss({requiresLogin: false, errorMsg: accountMessaging.cancelled})} className="-padded">
            <PageTitle title="Confirm Account">{accountMessaging.reauthHelper}</PageTitle>
            <LoginForm onSuccess={() => this.handleUpdateAndDismiss({requiresLogin: false, successMsg: accountMessaging.success})} />
          </Pop>
        }
      </div>
    );
  }
};
