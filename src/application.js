import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import configureStore from './store/configureStore'
import client from '+root/constants/apollo'

import Entry from './slices/Entry'

import fonts from '../styles/fonts/index.scss'
import styles from '../styles/globals/index.scss'

const store = configureStore();

// import seedNarrative from '+root/utils/seedNarrative'
// import data from '+root/utils/seedNarrative/data.json'

// seedNarrative(data);

const Container = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Entry />
    </Provider>
  </ApolloProvider>
);

const App = hot(module)(Container);

ReactDOM.render(<App />, document.getElementById('app'));
