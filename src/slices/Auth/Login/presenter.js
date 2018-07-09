import React from 'react';
import { Link } from 'react-router-dom';

import { PageTitle, Helper } from '+dumb/Headers';
import { EmailInput, PasswordInput } from '+dumb/Inputs';
import { Content } from '+dumb/Layouts'
import Button from '+dumb/Button'

export default class extends React.Component {
  state = {
    errorMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit, history } = this.props;

    onSubmit({
      email: this.email.value,
      password: this.password.value
    }).then(() => history.push('/parties'))
  }

  render () {
    return (
      <React.Fragment>
        <PageTitle title="Login">
          <Helper>Always good to see a familiar email.<br />Not familiar? <Link to="/sign-up">Sign up here</Link>.</Helper>
        </PageTitle>

        <form onSubmit={this.handleSubmit} className="endcap">
          { this.state.errorMsg &&
            <div className="notice -error" role="alert">
              {this.state.errorMsg}
            </div>
          }

          <Content title="Email">
            <EmailInput
              placeholder="goingtomurder@withmyfriends.com"
              inputRef={val => this.email = val} />
          </Content>

          <Content title="Password">
            <PasswordInput
              inputRef={val => this.password = val} />
          </Content>

          <Button value="Login" />
        </form>
      </React.Fragment>
    );
  }
}
