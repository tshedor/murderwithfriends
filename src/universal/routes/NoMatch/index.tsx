import * as React from 'react';

import { PageTitle } from '+dumb/Headers';

export default () => {
  document.title = 'Page Not Found | Murder with Friends';

  return (
    <PageTitle title="Page Not Found">
      Perhaps it was once here. Perhaps it was never here. Perhaps it was only our imagination.
    </PageTitle>
  );
};
