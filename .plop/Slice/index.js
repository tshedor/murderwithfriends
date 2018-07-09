import makeDataFetchingContainer from '+root/universal/factories/dataFetchingContainer'

import Presenter from './index'
import { onMount, onUnmount } from './actions'

const DataFetchingContainer = makeDataFetchingComponent(Presenter, onMount, onUnmount)

export default DataFetchingContainer;
