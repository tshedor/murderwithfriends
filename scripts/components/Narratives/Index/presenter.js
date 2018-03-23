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
    const { characters, text } = this.props;

    return (
      <React.Fragment>
        <div className="narrative" onClick={this.toggleShowNewParty}>
          { this.state.showNewParty ? 'Cancel' : 'Create' }
          <br />

          {text}

          {Object.keys(characters).map(key =>
            <Character key={key} displayName={characters[key].displayName} text={characters[key].text} />
          )}
        </div>

        {this.state.showNewParty &&
          <NewPartyForm narrativeId={this.props.uid} />
        }
      </React.Fragment>
    );
  }
};

const Presenter = ({ narratives }) => (
  <div className="narratives">
    { Object.keys(narratives).map(key =>
      <Narrative key={key} uid={key} characters={narratives[key].characters} text={narratives[key].text} />
    )}
  </div>
);

Presenter.propTypes = {
  narratives: PropTypes.object.isRequired
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
