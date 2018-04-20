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
    <div className="iterator">{`#${clue.roundId}` || 'Pre Party'}</div>
    <div className="inside">{clue.text}</div>
  </li>
);

export default class extends React.Component {
  state = {
    showEditForm: false,
    showParty: false,
    showRounds: false
  }

  static defaultProps = {
    clues: {}
  }

  displayName = __dirname.replace('scripts/components/', '');

  toggleEditForm = e => {
    e.preventDefault();

    this.setState({ showEditForm: !!this.state.showEditForm })
  }

  render() {
    const { isPartyMaster, onAdvanceCurrentRound, clues, partyCharacters, party, currentPartyUid } = this.props;

    return (
      <React.Fragment>

        {isPartyMaster &&
          <NextButton />
        }

        {isPartyMaster ? (
          <React.Fragment>
            <h2>Edit Party Deets</h2>
            <EditParty
              showTitle={false}
              narrativeId={party.narrativeId}
              displayName={party.displayName}
              text={party.text}
              time={party.time}
              location={party.location}
              otherNotes={party.otherNotes} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>{party.displayName}</h2>
            <div className="content">{party.text}</div>

            <h3>Time & Place</h3>
            <div className="content">
              <strong>{party.time}</strong> @ {party.location}
            </div>

            <h3>Also</h3>
            <div className="content">{party.otherNotes}</div>
          </React.Fragment>
        )}

        { isPartyMaster &&
          <React.Fragment>
            <h2>Clues</h2>
            <p className="helper">Prepare these before the party and set them out on a designated table at the start of each noted round. An actor should retrieve the clue if it's listed in their round notes.</p>

            <ol className="numbered-list">
              {Object.keys(clues).map(key =>
                <Clue clue={clues[key]} key={key} />
              )}
            </ol>
          </React.Fragment>
        }

        { isPartyMaster &&
          <Drawer open={this.state.showRounds} toggleOpen={open => this.setState({ showRounds: open })} title="Rounds">
            <Rounds />
          </Drawer>
        }

      </React.Fragment>
    );
  }
};
