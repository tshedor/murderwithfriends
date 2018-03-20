import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PageTitle } from 'components/Headers';
import { FullWithTitle } from 'components/Layouts';
import Form from './Form';

export default class extends React.Component {
  static propTypes = {
    loadCurrentNarrative: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.title = 'Login | Murder with Friends';
    analytics.page();
  }

  render() {
    return (
      <FullWithTitle>
        <PageTitle title="Login">
          Always good to see a familiar email.<br />Not familiar? <Link to="/sign-up">Sign up here</Link>.
        </PageTitle>

        <Form onSuccess={this.props.loadCurrentNarrative} />
      </FullWithTitle>
    );
  }
};
