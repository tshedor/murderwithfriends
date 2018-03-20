import React from 'react';
import PropTypes from 'prop-types';

const Presenter = ({label, options, error, inputRef, ...res}) => (
  <fieldset>
    { label &&
      <label>{label}</label>
    }

    <select
      ref={inputRef}
      {...res} >
      {!res.defaultValue &&
        <option>Please choose an option</option>
      }
      {options.map(option => {
        const value = option.value || option;
        const displayName = option.displayName || option;

        return (
          <option value={value} key={value}>
            {displayName}
          </option>
        );
      })}
    </select>

    <div className="input-error">{error}</div>
  </fieldset>
);

Presenter.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        displayName: PropTypes.string.isRequired
      })
    )
  ]),
  onChange: PropTypes.func
};

export default Presenter;
