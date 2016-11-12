import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SyncValidationSimple from '../examples/sync-validation/simple.jsx';
import MultiValidationSimple from '../examples/multi-validation/simple.jsx';
import SubmitValidationSimple from '../examples/submit-validation/simple.jsx';
import AsyncValidationSimple from '../examples/async-validation/simple.jsx';
import WhistleConfirm from '../examples/confirm/simple';

storiesOf('SyncValidation', module)
  .add('Simple', () => (
    <SyncValidationSimple />
  ));

storiesOf('MultiValidation', module)
  .add('Simple', () => (
    <MultiValidationSimple />
  ));

storiesOf('SubmitValidation', module)
  .add('Simple', () => (
    <SubmitValidationSimple />
  ));

storiesOf('AsyncValidationSimple', module)
  .add('Simple', () => (
    <AsyncValidationSimple />
  ));

storiesOf('Whistle', module)
  .add('Simple', () => (
    <WhistleConfirm />
  ));
