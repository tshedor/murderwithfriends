/// <reference types="history" />

import * as React from 'react'
import PropTypes from 'prop-types'

import { TextInput, TextareaInput } from '+dumb/Inputs'
import { Content } from '+dumb/Layouts'
import Button from '+dumb/Button'
import * as ReactRouter from 'react-router'

function buildNarrativeOptions(narratives) {
  return Object.keys(narratives).map(key => {
    return { value: key, displayName: narratives[key].displayName }
  });
}

interface PresenterProps extends _types.Party, ReactRouter.RouterProps {
  onSubmit: (p: object) => void
  narrativeId: string
  showTitle: boolean
}

export default class extends React.Component<PresenterProps> {
  displayName: HTMLInputElement
  text: HTMLInputElement
  location: HTMLInputElement
  time: HTMLInputElement
  otherNotes: HTMLInputElement

  static displayName = __dirname.replace('src/slices/', '')

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      displayName: this.displayName.value,
      text: this.text.value,
      location: this.location.value,
      time: this.time.value,
      otherNotes: this.otherNotes.value,
      narrativeId: this.props.narrativeId
    });

    if (this.props.history) {
      this.props.history.push('/parties');
    }
  }

  render() {
    return (
      <React.Fragment>
        { this.props.showTitle &&
          <h1>New Party</h1>
        }

        <Content>
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

            <Button value="Save" inverted />
          </form>
        </Content>
      </React.Fragment>
    );
  }
};
