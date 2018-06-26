import * as React from 'react'

import Icon from '+dumb/Icon'
import Button from '+dumb/Button'

interface PresenterProps {
  isPartyMaster?: boolean;
  currentPartyUid?: string;
  partyPlayerId?: string;
  characterId: string;
}

const Presenter: React.SFC<PresenterProps> = ({ isPartyMaster, currentPartyUid, partyPlayerId }) => {
  if (!isPartyMaster || !partyPlayerId) return null;

  return (
    <Button
      iconName="link"
      path={`/parties/${currentPartyUid}/${partyPlayerId}`}>
      Player Link
      <em>Copy & send this link to your actor</em>
    </Button>
  );
};

export default Presenter;
