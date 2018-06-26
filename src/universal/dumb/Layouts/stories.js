import React from 'react';
import { storiesOf } from '@storybook/react';
import { Section, Content } from './index';

storiesOf('Layouts', module)
  .add('Section', () => (
    <Section title="A Section">
      <div>
        <strong>Dangerously</strong> escape <em>this</em>.
      </div>
    </Section>
  ))
  .add('Content', () => (
    <Content title="Content">
      <div>
        <strong>Dangerously</strong> escape <em>this</em>.
      </div>
    </Content>
  ));
