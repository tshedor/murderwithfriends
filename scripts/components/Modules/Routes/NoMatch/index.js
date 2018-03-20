import React from 'react';

import { PageTitle } from 'components/Headers';
import { FullWithTitle } from 'components/Layouts';

export default () => {
  document.title = 'Page Not Found | Murder with Friends';
  analytics.page('404');

  return (
    <FullWithTitle>
      <PageTitle title="Page Not Found">
        Perhaps it was once here. Perhaps it was never here. Perhaps it was only our imagination.
      </PageTitle>
    </FullWithTitle>
  );
};
