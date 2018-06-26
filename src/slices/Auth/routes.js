import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ResetPassword from './_components/ResetPassword';
import VerifyEmail from './_components/VerifyEmail';
import Login from './_components/Login';
import Register from './_components/Register';
import Invited from './_components/Invited';
import EmailActionHandler from './_components/EmailActionHandler';

import { NoMatch, PrivateRoute, PublicRoute } from '+dumb/Routes';

const Presenter = ({ authed }) => (
  <Switch>
    <PublicRoute exact path="/login" component={Login} authed={authed}  />
    <Route exact path="/invited" component={Invited} />
    <Route exact path="/verify-email" component={VerifyEmail} />
    <Route exact path="/email-actions" render={EmailActionHandler} />
    <PublicRoute exact path="/forgot-password" title="Reset Password" authed={authed}  component={ResetPassword} />
    <PublicRoute exact path="/sign-up" title="Sign up" authed={authed} component={Register} />
  </Switch>
);

export default Presenter;
