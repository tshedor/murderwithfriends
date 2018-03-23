import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Characters from 'components/Characters/Index'
import Drawer from 'components/Drawer'
import Rounds from 'components/Rounds/Index'

import Character from 'components/Characters/Block'

import Icon from 'components/Modules/Icon'

function nextRoundText(currentRound) {
  if (currentRound === 0) {
    return 'Start the Party';
  }

  if (currentRound === 3) {
    return 'Vote for the Killer';
  }

  if (currentRound === 4) {
    return 'End the Party';
  }

  return 'Next Round';
}

const Clue = ({ clue }) => (
  <div className="clue">
    {clue.text}
    Set out for character in Round {clue.roundId || 'Pre Party'}
  </div>
);

export default class extends React.Component {
  state = {
    showEditForm: false,
    showCharacters: true
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
          <React.Fragment>
            <a href="#" onClick={this.toggleEditForm}>{this.state.showEditForm ? 'Cancel' : 'Edit'}</a>
            {this.state.showEditForm &&
              <EditParty narrativeId={currentParty.narrativeId} />
            }

            <div className="button" onClick={onAdvanceCurrentRound}>{nextRoundText(currentRound)}</div>

            <Drawer open={this.state.showClues} toggleOpen={open => this.setState({ showClues: open })} title="Clues">
              {Object.keys(clues).map(key =>
                <Clue clue={clues[key]} key={key} />
              )}
            </Drawer>

          </React.Fragment>
        }

        <Drawer open={this.state.showCharacters} toggleOpen={open => this.setState({ showCharacters: open })} title="Characters">
          {isPartyMaster ? (
            <React.Fragment>
              {Object.keys(partyCharacters).map(key =>
                <Character key={partyCharacters[key]?.partyPlayerId} characterId={key}>
                  <p>Copy & send this link to your player: <Link to={`/parties/${currentPartyUid}/${partyCharacters[key]?.partyPlayerId}`}><Icon name="link" /></Link></p>
                </Character>
              )}
            </React.Fragment>
          ) : (
            <Characters />
          )}
        </Drawer>

        <Rounds />

      </React.Fragment>
    );
  }
};
