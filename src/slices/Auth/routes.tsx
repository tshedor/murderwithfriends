import * as React from 'react';
import { Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

import { PublicRoute } from '+root/universal/routes';

const Presenter = () => (
  <Switch>
    <PublicRoute exact path="/login" title="Login" component={Login} />
    <PublicRoute exact path="/sign-up" title="Sign up" component={Register} />
  </Switch>
);

export default Presenter;
