import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { ApolloProvider } from 'react-apollo'

import client from '+root/constants/apollo'

import Entry from './slices/Entry'

import fonts from '../styles/fonts/index.css'
import styles from '../styles/globals/index.css'

// import seedNarrative from '+root/utils/seedNarrative'
// import data from '+root/utils/seedNarrative/data.json'

// seedNarrative(data);

const Container = () => (
  <ApolloProvider client={client}>
    <Entry />
  </ApolloProvider>
);

const App = hot(Container);

ReactDOM.render(<App />, document.getElementById('app'));
