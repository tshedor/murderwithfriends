import * as React from 'react'
import { Link } from 'react-router-dom'

import { PageTitle, Helper } from '+dumb/Headers'
import { TextInput, EmailInput, PasswordInput } from '+dumb/Inputs'
import { Content } from '+dumb/Layouts'
import Button from '+dumb/Button'
import Notice from '+dumb/Notice'
import * as H from 'history';

type PresenterProps = {
  onSubmit: Function,
  history: H.History
}

export default class extends React.PureComponent<PresenterProps, {}> {
  displayName: React.RefObject<HTMLInputElement>
  email: React.RefObject<HTMLInputElement>
  password: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props);

    this.displayName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }

  state = {
    errorMsg: null
  }

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit, history } = this.props;

    onSubmit({
      email: this.email.current.value,
      password: this.password.current.value,
      displayName: this.displayName.current.value
    }).then(() => history.push('/parties'))
  }

  render () {
    return (
      <React.Fragment>
        <PageTitle title="Sign Up">
          <Helper>Always good to see a fresh email.<br />Been here before? <Link to="/login">Login here</Link>.</Helper>
        </PageTitle>

        <form onSubmit={this.handleSubmit}>
          <Notice msg={this.state.errorMsg} error />

          <Content title="Name">
            <TextInput
              placeholder="Schmitty Werber Wegermanjensen"
              required={true}
              ref={this.displayName} />
          </Content>

          <Content title="Email">
            <EmailInput
              placeholder="whatever@whatever.com"
              required={true}
              ref={this.email} />
          </Content>

          <Content title="Password">
            <PasswordInput
              required={true}
              ref={this.password} />
          </Content>

          <Button value="Sign Up" />
        </form>
      </React.Fragment>
    );
  }
}
