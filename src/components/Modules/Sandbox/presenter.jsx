import React from 'react';
import PropTypes from 'prop-types';

import { PlacesInput } from 'components/Modules/Inputs';

export default class extends React.Component {
  componentDidMount() {
    document.title = 'Sandbox | Murder with Friends';
  }

  render = () => (
    <PlacesInput
      onSelect={(val, placeId) => console.log(placeId)} />
  )
};
