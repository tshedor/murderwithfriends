import makeDataFetchingContainer from '+root/universal/factories/dataFetchingContainer'
import Presenter from './index'

import { onMount, onUnmount } from '../actions'

const DataFetchingContainer = makeDataFetchingContainer(Presenter, onMount, onUnmount);

export default DataFetchingContainer;
