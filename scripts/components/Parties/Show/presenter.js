import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Characters from 'components/Characters/Index'
import Drawer from 'components/Drawer'
import Rounds from 'components/Rounds/Index'

import Character from 'components/Characters/Block'

import EditParty from 'components/Parties/Edit'

import Icon from 'components/Modules/Icon'

function nextRoundText(currentRound) {
  if (!currentRound || currentRound === -1) {
    return 'Start the Party';
  }

  if (currentRound === '3') {
    return 'Vote for the Killer';
  }

  if (currentRound === '4') {
    return 'End the Party';
  }

  return 'Next Round';
}

function currentRoundText(currentRound) {
  if (!currentRound || currentRound === -1) {
    return `Party hasn't started`;
  }

  if (currentRound === '0') {
    return 'Currently Pre-Party';
  }

  if (currentRound === '4') {
    return 'End of Party';
  }

  return `Currently Round ${currentRound}`;
}

const Clue = ({ clue }) => (
  <li>
    {clue.roundId ? `Round ${clue.roundId}` : 'Pre Party'}:&nbsp;
    {clue.text}
  </li>
);

export default class extends React.Component {
  state = {
    showEditForm: false,
    showCharacters: true,
    showParty: false
  }

  static defaultProps = {
    clues: {},
    partyCharacters: {}
  }

  displayName = __dirname.replace('scripts/components/', '');

  toggleEditForm = e => {
    e.preventDefault();

    this.setState({ showEditForm: !!this.state.showEditForm })
  }

  render() {
    const { isPartyMaster, onAdvanceCurrentRound, currentRound, clues, partyCharacters, party, currentPartyUid } = this.props;

    return (
      <React.Fragment>

        {isPartyMaster &&
          <div className="button -large" onClick={onAdvanceCurrentRound}>{nextRoundText(currentRound)} <Icon name="right" /><em>{currentRoundText(currentRound)}</em></div>
        }

        <Drawer open={this.state.showParty} toggleOpen={open => this.setState({ showParty: open })} title="Party">
          {isPartyMaster ? (
            <EditParty narrativeId={party.narrativeId} />
          ) : (
            <React.Fragment>
              <div className="content">
                <ul>
                  <li><em>Name</em>: {party.name}</li>
                  <li><em>Location</em>: {party.location}</li>
                  <li><em>Time</em>: {party.time}</li>
                  <li><em>About</em>: {party.text}</li>
                  <li><em>Also</em>: {party.otherNotes}</li>
                </ul>
              </div>
            </React.Fragment>
          )}
        </Drawer>

        <Drawer open={this.state.showClues} toggleOpen={open => this.setState({ showClues: open })} title="Clues">
          <ul className="clues">
            {Object.keys(clues).map(key =>
              <Clue clue={clues[key]} key={key} />
            )}
          </ul>
        </Drawer>

        <Drawer open={this.state.showCharacters} toggleOpen={open => this.setState({ showCharacters: open })} title="Characters">
          {isPartyMaster ? (
            <React.Fragment>
              {Object.keys(partyCharacters).map(key =>
                <Character key={partyCharacters[key]?.partyPlayerId} characterId={key}>
                  <br />
                  <br />
                  <Link to={`/parties/${currentPartyUid}/${partyCharacters[key]?.partyPlayerId}`} className="button"><Icon name="link" /> Player Link<em>Copy & send this link to your actor</em></Link>
                </Character>
              )}
            </React.Fragment>
          ) : (
            <Characters />
          )}
        </Drawer>

        {isPartyMaster &&
          <React.Fragment>
            <br />
            <br />
            <br />
          </React.Fragment>
        }

        <Rounds />

      </React.Fragment>
    );
  }
};
