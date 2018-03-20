import React from 'react';

import { PageTitle } from '../../Headers';

const Presenter = ({title}) => (
  <div className="modal">
    <PageTitle title={title} />
  </div>
);

Presenter.defaultProps = {
  title: 'Loading...'
};

export default Presenter;
