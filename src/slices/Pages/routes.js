import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home'
import HowToHost from './HowToHost'
import HowToPlay from './HowToPlay'

const Presenter = () => (
  <Switch>
    <Route path="/" exact render={Home} />
    <Route path="/how-to-host" exact component={HowToHost} />
    <Route path="/how-to-play" exact component={HowToPlay} />
  </Switch>
);

export default Presenter;
