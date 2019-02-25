import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import parties from 'reducers/parties'
import party from 'reducers/party'
import ux from 'reducers/ux'

export default combineReducers({
  auth,
  parties,
  party,
  ux
});
