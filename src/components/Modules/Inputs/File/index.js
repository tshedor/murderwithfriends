import React from 'react';
import PropTypes from 'prop-types';

import { storageRef } from 'constants/firebase';

export default class extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
    namePrefix: PropTypes.string.isRequired
  }

  handleUpload = e => {
    const file = this.file.files[0];
    const name = `${this.props.namePrefix}${new Date().getTime()}-${file.name}`;
    const metadata = { contentType: file.type };

    storageRef.child(name).put(file, metadata).then(this.props.onUpload);
  }

  render() {
    const { label, error } = this.props;
    const file_name = `${new Date().getTime()}-file`;

    return (
      <fieldset className="file-input">
        { label &&
          <label>{label}</label>
        }

        <input type="file" onChange={this.handleUpload} ref={val => this.file = val} id={file_name} />
        <label htmlFor={file_name} className="button -small">Upload File</label>

        <div className="input-error">{error}</div>
      </fieldset>
    );
  }
};
