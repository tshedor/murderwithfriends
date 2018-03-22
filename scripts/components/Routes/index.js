import React from 'react'
import { IndexRoute, Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import { ResetPassword, VerifyEmail, Login, Register, Invited } from 'components/Auth'

import { EmailActionHandler, NoMatch, PrivateRoute, PublicRoute } from 'components/Modules/Routes'

import PartyRoute from './PartyRoute'
import PartyPlayerRoute from './PartyPlayerRoute'

import Sandbox from 'components/Modules/Sandbox'

import MyAccount from 'components/MyAccount'

import Initializer from './Initializer'

import PartyIndex from 'components/Parties/Index'
import PartyShow from 'components/Parties/Show'
import PartyNew from 'components/Parties/New'

import CharacterIndex from 'components/Characters/Index'
import CharacterShow from 'components/Characters/Show'

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
        <div>
          { authed &&
            <Initializer />
          }
          <Switch>
            <Route path="/" exact render={() => authed ? <Redirect to="/parties" /> : <Redirect to="/login" />} />

            <Route path="/login" exact render={() => authed ? <Redirect to="/parties" /> : <Login /> } />
            <Route path="/invited" exact component={Invited} />
            <Route path="/verify-email" component={VerifyEmail} />
            <Route path="/email-actions" exact render={EmailActionHandler} />
            <PublicRoute title="Reset Password" authed={authed} path="/forgot-password" component={ResetPassword} />
            <PublicRoute title="Sign up" authed={authed} path="/sign-up" component={Register} />

            {/* <PrivateRoute {...private_props} path="/sandbox" component={Sandbox} /> */}

            <PrivateRoute {...private_props} title="Parties" path="/parties" component={PartyIndex} />

            <PartyRoute title="My Party" path="/parties/:partyId" component={PartyShow} />
            <PartyPlayerRoute title="My Character" path="/parties/:partyId/:playerId" component={CharacterShow} />
            <PartyRoute title="All Characters" path="/parties/:partyId/characters" component={CharacterIndex} />

            <PrivateRoute {...private_props} title="New Party" path="/parties/new" component={PartyNew} />

            <PrivateRoute {...private_props} title="My Account" path="/my-account" component={MyAccount} />
            <Route component={NoMatch} status={404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
