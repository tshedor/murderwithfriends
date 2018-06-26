import { refParties } from 'constants/firebase';

import { removeUndefinedValues, updated } from 'actions/shared';

const editParty = ({ displayName, text, location, time, otherNotes }) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  return refParties(currentPartyUid).update({
    ...removeUndefinedValues({
      displayName,
      text,
      location,
      time,
      otherNotes
    }),
    ...updated()
  });
};

export default editParty;
