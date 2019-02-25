import React from 'react';
import { storiesOf } from '@storybook/react';
import { PageTitle, Helper } from './index';

storiesOf('Headers', module)
  .add('PageTitle', () => (
    <PageTitle title="Normal Page Title" />
  ))
  .add('Descriptive Page Title', () => (
    <PageTitle title="Descriptive Page Title">Additional helper text</PageTitle>
  ))
  .add('Helper', () => (
    <Helper>Explanatory text that isn't crucial but is nonetheless worth saying</Helper>
  ));
  