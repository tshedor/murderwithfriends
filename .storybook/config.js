import { configure } from '@storybook/react';

const req = require.context1('../src', true, /stories\.(jsx?|tsx?)$/)

function loadStories() {
  require('../styles/globals/index.css');
  require('../styles/fonts/index.css');

  req.keys().forEach(req);
}

configure(loadStories, module);
