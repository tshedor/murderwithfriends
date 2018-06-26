import makeDataFetchingContainer from '+root/universal/factories/dataFetchingContainer'
import Presenter from './routes'

import { onMount, onUnmount } from '../actions'

const DataFetchingContainer = makeDataFetchingContainer(Presenter, onMount, onUnmount);

export default DataFetchingContainer;
