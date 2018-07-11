import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'

import client from '+root/constants/apollo'

import Entry from './slices/Entry'

import fonts from '../styles/fonts/index.scss'
import styles from '../styles/globals/index.scss'

// import seedNarrative from '+root/utils/seedNarrative'
// import data from '+root/utils/seedNarrative/data.json'

// seedNarrative(data);

const Container = () => (
  <ApolloProvider client={client}>
    <Entry />
  </ApolloProvider>
);

const App = hot(module)(Container);

ReactDOM.render(<App />, document.getElementById('app'));
