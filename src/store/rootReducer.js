import { combineReducers } from 'redux'

import members from '+root/slices/Characters/reducer'
import parties from '+root/slices/Parties/reducer'
import permissions from '+root/universal/reducers/permissions'
import narratives from '+root/reducers/narratives'

const reducers = combineReducers({
  members,
  narratives,
  parties,
  permissions
});

export default reducers;
