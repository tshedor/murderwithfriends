import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

function htmlId(name, option) {
  return `${stringToUnderscores(name)}_${stringToUnderscores(option)}`;
}

function stringToUnderscores(str) {
  if (!str) {
    return null;
  }

  return str
    .toLowerCase()
    .replace(/\n/g, '')
    .replace(/\s/g, '_')
    .replace(/"/g, '\"');
}


export default class extends React.Component {
  inputs = {}

  static defaultProps = {
    type: 'checkbox',
    defaultChecked: []
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    type: PropTypes.string
  }

  handleChange = e => {
    if (this.props.type === 'checkbox') {
      const checked = Object.values(this.inputs).filter(input => input.checked);
      const values = checked.map(i => i.value);
      this.props.onChange( values );
    } else {
      this.props.onChange( e.currentTarget.value );
    }
  }

  isChecked = (option) => {
    if (this.props.type === 'checkbox') {
      return this.props.defaultChecked.indexOf(option) > -1;
    } else {
      return option === this.props.defaultChecked;
    }
  }

  render() {
    return (
      <fieldset className={classNames(styles.root, styles.rootGroup, `prop${this.props.type}`)}>
        <label>{this.props.label}</label>
        {this.props.options.map(option =>
          <label className={styles.nestedLabel} htmlFor={htmlId(this.props.label, option)} key={option}>
            <input
              type={this.props.type}
              id={htmlId(this.props.label, option)}
              value={option}
              onChange={this.handleChange}
              ref={val => this.inputs[option] = val}
              name={stringToUnderscores(this.props.label)}
              defaultChecked={this.isChecked(option)} />
            <span></span>
            {option}
          </label>
        )}
      </fieldset>
    );
  }
};
