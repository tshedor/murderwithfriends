import { firebaseAuth, refNarratives, refParties, refPartyRounds, refParty } from 'constants/firebase'
import * as universalTypes from 'constants/actionTypes'
import * as types from './actionTypes'

import makeOnOffFetchListener from '+root/universal/factories/onOffFetchListener'

const loadPartyAndNarrative = partyId => (dispatch, getState) => {
  return refParties(partyId).once('value').then(snap => {
    const party = { [partyId]: snap.val() || {} };

    dispatch( receiveParty( party ) );

    refNarratives(party[partyId].narrativeId).once('value').then(narrativeSnap => {
      const narrative = { [narrativeSnap.key]: narrativeSnap.val() || {} };

      dispatch( receiveNarrative(narrative) );
    });
  });
};

function generateListeners(dispatch, { partyId }) {
  return [
    {
      ref: refPartyRounds(partyId),
      callback: snapshot => {
        const data = snapshot.val() || {};
        const rounds = Object.keys(data).sort((a, b) => a - b);
        const latestRound = rounds.pop();

        dispatch( advanceToRound(latestRound) );
        dispatch( receivePartyRounds(data) );
      }
    },
    {
      ref: refParty(partyId),
      callback: snapshot => {
        dispatch( loadPartyAndNarrative(partyId) );
        dispatch( setCurrentParty(snapshot.val() || {}, partyId) )
      }
    }
  ];
}

function advanceToRound(roundId) {
  return {
    type: types.ADVANCE_TO_ROUND,
    roundId
  };
}

function receiveParty(party) {
  return {
    type: types.RECEIVE_PARTY,
    party
  };
}

function receivePartyRounds(rounds) {
  return {
    type: types.RECEIVE_PARTY_ROUNDS,
    rounds
  };
}

function setCurrentParty(party, partyId) {
  return {
    type: universalTypes.SET_CURRENT_PARTY,
    party,
    partyId
  };
}

function receiveNarrative(narrative) {
  return {
    type: universalTypes.RECEIVE_NARRATIVE,
    narrative
  };
}

export const { onMount, onUnmount } = makeOnOffFetchListener(generateListeners);
