import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import EditParty from '../Edit'
import NextButton from '../_components/NextButton'

import Icon from '+dumb/Icon'

import { NumberedList } from '+dumb/Lists'
import { Content } from '+dumb/Layouts'
import { Helper } from '+dumb/Headers'

export default class extends React.PureComponent {
  state = {
    showEditForm: false,
    showParty: false
  }

  static defaultProps = {
    clues: {}
  }

  static displayName = __dirname.replace('src/slices/', '');

  toggleEditForm = e => {
    e.preventDefault();

    this.setState({ showEditForm: !!this.state.showEditForm })
  }

  render() {
    const { isPartyMaster, clues, partyCharacters, party, currentPartyUid } = this.props;

    if (isPartyMaster) {
      return (
        <React.Fragment>
          <NextButton />

          <h2>Edit Party Deets</h2>
          <EditParty
            showTitle={false}
            narrativeId={party.narrativeId}
            displayName={party.displayName}
            text={party.text}
            time={party.time}
            location={party.location}
            otherNotes={party.otherNotes} />

          <h2>Clues</h2>
          <Helper>Prepare these before the party and set them out on a designated table at the start of each noted round. An actor should retrieve the clue if it's listed in their round notes.</Helper>

          <NumberedList
            data={clues}
            iteratorRender={item => `#${item.roundId}` || 'Pre Party'}
            render={item => item.text} />

        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Content title={party.displayName} children={party.text} />

          <Content title="Time & Place">
            <strong>{party.time}</strong> @ {party.location}
          </Content>

          <Content title="Also" children={party.otherNotes} />
        </React.Fragment>
      );
    }
  }
};
