import * as React from 'react'

import Button from '+dumb/Button'

interface PresenterProps {
  isOwner?: boolean
  partyId?: string
  playerId?: string
}

const Presenter: React.SFC<PresenterProps> = ({ isOwner, partyId, playerId }) => {
  if (!isOwner || !playerId) return null;

  return (
    <Button
      iconName="link"
      path={`/parties/${partyId}/${playerId}`}>
      Player Link
      <em>Copy & send this link to your actor</em>
    </Button>
  );
};

export default Presenter;
