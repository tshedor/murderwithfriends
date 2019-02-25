import React from 'react'

const BasicInput = ({label, error, type, forwardedRef, ref, children, ...props}) => (
  <React.Fragment>
    {label &&
      <label>{label}</label>
    }
    <input type={type} ref={forwardedRef} {...props} />
  </React.Fragment>
);

const inputWrapper = (type) => React.forwardRef((props, ref) =>
  <BasicInput type={type} forwardedRef={ref}  {...props} />
);

export const TextInput = inputWrapper('text');
export const UrlInput = inputWrapper('text');
export const NumberInput = inputWrapper('number');
export const EmailInput = inputWrapper('email');
export const PasswordInput = inputWrapper('password');

export const TextareaInput = React.forwardRef(({label, ...props}, ref) =>
  <React.Fragment>
    {label &&
      <label>{label}</label>
    }
    <textarea ref={ref} {...props}></textarea>
  </React.Fragment>
);
