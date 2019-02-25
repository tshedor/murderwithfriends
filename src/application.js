import React from 'react';
import ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader'

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Entry from './slices/Entry'

import fonts from '../styles/fonts/index.scss'
import styles from '../styles/globals/index.scss'

const store = configureStore();

const Container = () => (
  <Provider store={store}>
    <Entry />
  </Provider>
);

const App = hot(module)(Container);

ReactDOM.render(<App />, document.getElementById('app'));
