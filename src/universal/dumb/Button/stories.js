import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index';

storiesOf('Button', module)
  .add('Button', () => (
    <Button path="http://example.com">Button</Button>
  ))
  .add('Large Button', () => (
    <Button large>Large Button</Button>
  ))
  .add('Small Button', () => (
    <Button small>Small Button</Button>
  ))
  .add('Inverted Button', () => (
    <Button inverted>Inverted Button</Button>
  ))
  .add('Icon Button', () => (
    <Button iconName="user">Icon Button</Button>
  ))
  .add('Submit', () => (
    <Button>Hello Button</Button>
  ));
