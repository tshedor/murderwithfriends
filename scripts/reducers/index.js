import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import narratives from 'reducers/narratives'
import parties from 'reducers/parties'
import ux from 'reducers/ux'

export default combineReducers({
  auth,
  narratives,
  parties,
  ux
});
