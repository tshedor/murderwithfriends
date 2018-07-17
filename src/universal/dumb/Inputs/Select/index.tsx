import * as React from 'react'

const styles = require('./styles.scss')

type OptionProps = {
  value: string
  displayName: string
}

interface SelectOptions {
  label: string
  options: string[] | OptionProps[]
  defaultValue?: string
  error?: string
}

const makeOption = (option) => {
  const value = option.value || option;
  const displayName = option.displayName || option;

  return (
    <option value={value} key={value}>
      {displayName}
    </option>
  );
}

const Presenter = React.forwardRef(({label, options, error, ...props}: SelectOptions, ref: React.RefObject<HTMLSelectElement>) =>
  <fieldset>
    { label &&
      <label>{label}</label>
    }

    <select
      ref={ref}
      className={styles.root}
      {...props} >

      {!props.defaultValue &&
        <option>Please choose an option</option>
      }

      {(options as (string | OptionProps)[]).map(makeOption)}
    </select>

    <div className={styles.error}>{error}</div>
  </fieldset>
);

export default Presenter;
