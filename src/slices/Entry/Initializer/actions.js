import { firebaseAuth, refRoot, refParties, refMyParties, table, refNarratives } from 'constants/firebase'
import { onAuthStateChanged } from 'utils/auth'
import * as types from 'constants/actionTypes'

import makeOnOffFetchListener from '+root/universal/factories/onOffFetchListener'

function generateListeners(dispatch) {
  return [
    {
      ref: refRoot(table.NARRATIVE_PREVIEWS),
      callback: snapshot => dispatch(receiveNarrativePreviews(snapshot.val() || {}))
    }
  ]
}

function receiveNarrativePreviews(previews) {
  return {
    type: types.RECEIVE_NARRATIVE_PREVIEWS,
    previews
  };
}

export const { onMount, onUnmount } = makeOnOffFetchListener(generateListeners);

const initializeListeners = () => (dispatch, getState) => {
  onAuthStateChanged(user => {
    // dispatch( resetAll() )
    if (user) {
      dispatch( onMount() );
    }
  });
};

/**
 * MARK: Redux-only
 */

function resetAll() {
  return {
    type: types.RESET
  };
}
