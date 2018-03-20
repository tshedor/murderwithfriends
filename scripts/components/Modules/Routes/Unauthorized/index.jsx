import React from 'react';

import { PageTitle } from 'components/Headers';
import { FullWithTitle } from 'components/Layouts';

export default () => (
  <FullWithTitle>
    <PageTitle title="No can do">
      Sorry friend, you've hit a page without sufficient privileges. Contact your narrative admin if you want to see what the fun's all about.
    </PageTitle>
  </FullWithTitle>
);
