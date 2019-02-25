import React from 'react';
import { Link } from 'react-router-dom';

import { PageTitle, Helper } from '+dumb/Headers';
import { EmailInput, PasswordInput } from '+dumb/Inputs';
import { Content } from '+dumb/Layouts'
import Button from '+dumb/Button'
import Notice from '+dumb/Notice'

import { login } from 'utils/auth'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  state = {
    errorMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    const { history } = this.props;

    login(
      this.email.current.value,
      this.password.current.value
    )
      .then(() => history.push('/parties'))
      .catch(e => this.setState({ errorMsg: e.graphQLErrors?.[0]?.functionError }))
  }

  render () {
    return (
      <React.Fragment>
        <PageTitle title="Login">
          <Helper>Always good to see a familiar email.<br />Not familiar? <Link to="/sign-up">Sign up here</Link>.</Helper>
        </PageTitle>

        <form onSubmit={this.handleSubmit} className="endcap">
          <Notice msg={this.state.errorMsg} error />

          <Content title="Email">
            <EmailInput
              placeholder="goingtomurder@withmyfriends.com"
              ref={this.email} />
          </Content>

          <Content title="Password">
            <PasswordInput
              ref={this.password} />
          </Content>

          <Button value="Login" />
        </form>
      </React.Fragment>
    );
  }
}
