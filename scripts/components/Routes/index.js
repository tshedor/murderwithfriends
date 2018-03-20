import React from 'react'
import { IndexRoute, Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import { ResetPassword, VerifyEmail, Login, Register, Invited } from 'components/Auth'

import NoMatch from './NoMatch'
import Sandbox from 'components/Sandbox'

import MyAccount from 'components/MyAccount'

import Initializer from './Initializer'
import PrivateRoute from 'components/Modules/Routes/PrivateRoute'
import NarrativeRoute from './NarrativeRoute'

import { onAuthStateChanged } from 'utils/auth'

export default class extends React.Component {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = onAuthStateChanged(user => {
      this.setState({
        authed: !!user,
        verified: true, //!!user && !!user.emailVerified,
        loading: false
      });
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  render() {
    const { authed, verified, loading } = this.state;

    const private_props = { authed, verified };

    if (loading) {
      return null;
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          <GlobalNav authed={authed} />
          { authed &&
            <Initializer />
          }
          <Switch>
            <Route path="/" exact render={() => authed ? <Redirect to="/my-narrative" /> : <Redirect to="/login" />} />

            <Route path="/login" exact render={() => authed ? <Redirect to="/my-narrative" /> : <Login /> } />
            <Route path="/invited" exact component={Invited} />
            <Route path="/verify-email" component={VerifyEmail} />
            <Route path="/email-actions" exact render={EmailActionHandler} />
            <PublicRoute title="Reset Password" authed={authed} path="/forgot-password" component={ResetPassword} />
            <PublicRoute title="Sign up" authed={authed} path="/sign-up" component={Register} />

            {/* <PrivateRoute {...private_props} path="/sandbox" component={Sandbox} /> */}

            <NarrativeRoute {...private_props} title="Settings" path="/my-narrative/settings" component={NarrativeSettings} />

            <PrivateRoute {...private_props} title="My Narratives" path="/my-narratives" component={AllNarratives} />
            <PrivateRoute {...private_props} title="My Account" path="/my-account" component={MyAccount} />
            <PrivateRoute {...private_props} title="New Narrative" path="/create-narrative" component={CreateNarrative} />
            <Route component={NoMatch} status={404} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
