import { Fragment } from 'react'
import makeDataFetchingContainer from '+root/universal/factories/dataFetchingContainer'
import Presenter from './index'

import { onMount, onUnmount } from './actions'

const DataFetchingContainer = makeDataFetchingContainer(Fragment, onMount, onUnmount);

export default DataFetchingContainer;
