import { combineReducers } from 'redux'

import members from '+root/slices/Characters/reducer'
import permissions from '+root/universal/reducers/permissions'
import narratives from '+root/reducers/narratives'

const reducers = combineReducers({
  members,
  narratives,
  permissions
});

export default reducers;
