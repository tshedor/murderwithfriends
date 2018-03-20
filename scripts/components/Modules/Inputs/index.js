import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import { stringToUnderscores } from './shared';

export { default as CheckboxRadioGroup } from './CheckboxRadioGroup';
export { default as SelectInput } from './Select';
export { default as FileInput } from './File';

const BasicInput = ({label, error, type, inputRef, children, ...res}) => (
  <fieldset>
    { label &&
      <label>{label}</label>
    }
    <input type={type} ref={inputRef} {...res} />
    {!!children && children}
    <div className="input-error">{error}</div>
  </fieldset>
);
BasicInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputRef: PropTypes.func
};

export const TextInput = props => <BasicInput type="text" {...props} />
TextInput.propTypes = default_input_types;

export const UrlInput = props => <BasicInput type="text" {...props} />
UrlInput.propTypes = default_input_types;

export const NumberInput = props => <BasicInput type="number" {...props} />
NumberInput.propTypes = default_input_types;

export const EmailInput = props => <BasicInput type="email" {...props} />
EmailInput.propTypes = default_input_types;

export const PasswordInput = props => <BasicInput type="password" {...props} />
PasswordInput.propTypes = default_input_types;

export const CurrencyInput = ({label, error, inputRef, children, ...res}) => (
  <fieldset>
    { label &&
      <label>{label}</label>
    }
    <div className="currency-input">
      <Icon name="budget" />
      <input type="number" ref={inputRef} {...res} />
    </div>
    {!!children && children}
    <div className="input-error">{error}</div>
  </fieldset>
);
CurrencyInput.propTypes = default_input_types;

export const CheckboxInput = ({label, inputRef, onClick, options, ...res}) => (
  <fieldset className="toggle">
    <label onClick={onClick}>
      <input type="checkbox" name={stringToUnderscores(label)} ref={inputRef} {...res} />
      <span></span>
      {label}
    </label>
  </fieldset>
);
CheckboxInput.propTypes = {
  ...default_input_types,
  options: PropTypes.array,
  onClick: PropTypes.func
};

export const TextareaInput = ({label, inputRef, ...res}) => (
  <fieldset>
    { label &&
      <label>{label}</label>
    }
    <textarea ref={inputRef} {...res}></textarea>
  </fieldset>
);
TextareaInput.propTypes = default_input_types;

const default_input_types = {
  label: PropTypes.string,
  inputRef: PropTypes.func,
  error: PropTypes.string
};
