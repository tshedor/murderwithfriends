import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Form from './Form';

const Presenter = ({hasPremium}) => (
  <React.Fragment>
    <section className="row endcap">
      <div className="column w-10 -centered">
        <div className="row -spread -top">
          <aside className="column w-5">
            <Form />
          </aside>
        </div>
      </div>
    </section>
    <section className="column u-text-center">
      <p>For any other question, billing or account related, please email us <a href="mailto:support@wedfuly.com">here</a>.</p>
    </section>
  </React.Fragment>
);

Presenter.propTypes = {
  hasPremium: PropTypes.bool
};

export default Presenter;
