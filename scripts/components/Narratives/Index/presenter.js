import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Character = ({ displayName, text }) => (
  <div className="character">
    <h3>{displayName}</h3>
    {text}
  </div>
);

const Narrative = ({ narrative, narrativeId }) => (
  <div className="narrative">
    <h2>{narrative.displayName}</h2>
    <p className="content">
      {narrative.text}

      <Link to={`/parties/new/${narrativeId}`} className="button -inverse" >Create</Link>
    </p>
  </div>
);

const Presenter = ({ narratives }) => (
  <React.Fragment>
    <h1>Pick a Narrative</h1>
    <div className="narratives">
      { Object.keys(narratives).map(key =>
        <Narrative key={key} narrativeId={key} narrative={narratives[key]} />
      )}
    </div>
  </React.Fragment>
);

Presenter.propTypes = {
  narratives: PropTypes.object.isRequired
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
