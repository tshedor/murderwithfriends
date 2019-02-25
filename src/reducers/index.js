import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import parties from 'reducers/parties'
import narratives from 'reducers/narratives'
import party from 'reducers/party'
import ux from 'reducers/ux'

export default combineReducers({
  auth,
  parties,
  narratives,
  party,
  ux
});
