import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'

import Loading from '+dumb/Loading'

import Initializer from './Initializer'

import AuthRoutes from '+root/slices/Auth/routes';
import PageRoutes from '+root/slices/Pages/routes';
import PartyRoutes from '+root/slices/Parties/routes';
import { PrivateRoute } from '+dumb/Routes'

import GlobalNav from './_components/GlobalNav';
import NoMatch from './_components/NoMatch';

import { onAuthStateChanged } from 'utils/auth'

export default class extends React.PureComponent {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = onAuthStateChanged(user => {
      this.setState({
        authed: !!user,
        loading: false
      });
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  render() {
    const { authed, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          { authed &&
            <React.Fragment>
              <Initializer />
              <GlobalNav />
            </React.Fragment>
          }

          <Route path="/parties" component={PartyRoutes} />

          <AuthRoutes authed={authed} />
          <PageRoutes />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
