import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import EditParty from '../Edit'
import ChangeRound from '../_components/ChangeRound'

import Icon from '+dumb/Icon'

import { NumberedList } from '+dumb/Lists'
import { Content } from '+dumb/Layouts'
import { Helper } from '+dumb/Headers'

export default class extends React.PureComponent {
  static defaultProps = {
    clues: []
  }

  static displayName = __dirname.replace('src/slices/', '');

  render() {
    const { party, clues, isOwner } = this.props;

    if (!party) {
      return null;
    }

    if (isOwner) {
      console.log(clues);
      return (
        <React.Fragment>
          <ChangeRound partyId={party.id} />

          <h2>Edit Party Deets</h2>
          <EditParty
            showTitle={false}
            displayName={party.displayName}
            text={party.text}
            time={party.time}
            location={party.location}
            otherNotes={party.otherNotes} />

          <h2>Clues</h2>
          <Helper>Prepare these before the party and set them out on a designated table at the start of each noted round. An actor should retrieve the clue if it's listed in their round notes.</Helper>

          <NumberedList
            data={clues}
            iteratorRender={item => `#${item.roundNumber}` || 'Pre Party'}
            render={item => item.hint} />

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
