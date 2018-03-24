import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Characters from 'components/Characters/Index'
import Drawer from 'components/Drawer'
import Rounds from 'components/Rounds/Index'

import Character from 'components/Characters/Block'

import EditParty from '../Edit'
import NextButton from '../NextButton'

import Icon from 'components/Modules/Icon'

const Clue = ({ clue }) => (
  <li>
    <strong>{clue.roundId ? `Round ${clue.roundId}` : 'Pre Party'}:</strong>&nbsp;
    {clue.text}
  </li>
);

export default class extends React.Component {
  state = {
    showEditForm: false,
    showCharacters: false,
    showParty: false,
    showRounds: false
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
          <NextButton />
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
          <p className="helper">Prepare these before the party and set them out on a designated table at the start of each noted round</p>
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

        <Drawer open={this.state.showRounds} toggleOpen={open => this.setState({ showRounds: open })} title="Rounds">
          <Rounds />
        </Drawer>

      </React.Fragment>
    );
  }
};
