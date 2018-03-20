import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import ux from 'reducers/ux'

export default combineReducers({
  auth,
  ux
});
