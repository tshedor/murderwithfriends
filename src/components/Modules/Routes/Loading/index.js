import React from 'react';

import { PageTitle } from 'components/Headers';

const Presenter = ({title}) => (
  <div className="modal">
    <PageTitle title={title} />
  </div>
);

Presenter.defaultProps = {
  title: 'Loading...'
};

export default Presenter;
