import * as React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import AuthRoutes from '+root/slices/Auth/routes';
import PageRoutes from '+root/slices/Pages/routes';
import PartyRoutes from '+root/slices/Parties/routes';

import GlobalNav from './_components/GlobalNav';

export default class extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <GlobalNav />

          <Route path="/parties" component={PartyRoutes} />

          <AuthRoutes />
          <PageRoutes />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
