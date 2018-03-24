import React from 'react'
import PropTypes from 'prop-types'

import { TextInput, TextareaInput } from 'components/Modules/Inputs'

function buildNarrativeOptions(narratives) {
  return Object.keys(narratives).map(key => {
    return { value: key, displayName: narratives[key]?.displayName }
  });
}

export default class extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    narrativeId: PropTypes.string.isRequired,
    history: PropTypes.object
  }

  static displayName = __dirname.replace('scripts/components/', '')

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      displayName: this.displayName.value,
      text: this.text.value,
      location: this.location.value,
      time: this.time.value,
      otherNotes: this.otherNotes.value,
      narrativeId: this.props.narrativeId
    })

    if (this.props.history) {
      this.props.history.push('/parties');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          label="Name"
          defaultValue={this.props.displayName}
          inputRef={val => this.displayName = val} />

        <TextInput
          label="Location"
          defaultValue={this.props.location}
          inputRef={val => this.location = val} />

        <TextareaInput
          label="About"
          defaultValue={this.props.text}
          inputRef={val => this.text = val} />

        <TextInput
          label="Time"
          defaultValue={this.props.time}
          inputRef={val => this.time = val} />

        <TextareaInput
          label="Other Notes"
          defaultValue={this.props.otherNotes}
          inputRef={val => this.otherNotes = val} />

        <input type="submit" value="Save" className="button" />
      </form>
    );
  }
};
