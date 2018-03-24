import React from 'react'
import PropTypes from 'prop-types'

import NewPartyForm from 'components/Parties/New'

const Character = ({ displayName, text }) => (
  <div className="character">
    <h3>{displayName}</h3>
    {text}
  </div>
);

class Narrative extends React.Component {
  state = {
    showNewParty: false
  }

  toggleShowNewParty = e => this.setState({ showNewParty: !this.state.showNewParty })

  render() {
    const { characters, text, displayName } = this.props.narrative;

    return (
      <React.Fragment>
        <div className="narrative">
          <h2>{displayName}</h2>
          <p>{text}</p>

          <div className="button" onClick={this.toggleShowNewParty}>
            { this.state.showNewParty ? 'Cancel' : 'Create' }
          </div>
        </div>

        {this.state.showNewParty &&
          <NewPartyForm narrativeId={this.props.narrativeId} />
        }
      </React.Fragment>
    );
  }
};

const Presenter = ({ narratives }) => (
  <div className="narratives">
    { Object.keys(narratives).map(key =>
      <Narrative key={key} narrativeId={key} narrative={narratives[key]} />
    )}
  </div>
);

Presenter.propTypes = {
  narratives: PropTypes.object.isRequired
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
