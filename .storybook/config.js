import { configure } from '@storybook/react';

const req = require.context1('../src', true, /stories\.(jsx?|tsx?)$/)

function loadStories() {
  require('../styles/globals/index.scss');
  require('../styles/fonts/index.scss');

  req.keys().forEach(req);
}

configure(loadStories, module);
