import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PageTitle, Helper } from '+dumb/Headers';
import Form from './Form';

export default class extends React.Component {
  componentDidMount() {
    document.title = 'Login | Murder with Friends';
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title="Login">
          <Helper>Always good to see a familiar email.<br />Not familiar? <Link to="/sign-up">Sign up here</Link>.</Helper>
        </PageTitle>

        <Form />
      </React.Fragment>
    );
  }
};
