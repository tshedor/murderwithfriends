/// <reference types="history" />

import * as React from 'react'

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
  onSubmit: (p: object) => Promise<{ data: { buildRelationsForParty: { id: string } } }>
  narrativeId?: string
  showTitle: boolean
}

export default class extends React.Component<PresenterProps> {
  displayName: React.RefObject<HTMLInputElement>
  text: React.RefObject<HTMLInputElement>
  location: React.RefObject<HTMLInputElement>
  time: React.RefObject<HTMLInputElement>
  otherNotes: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props);

    this.displayName = React.createRef();
    this.text = React.createRef();
    this.location = React.createRef();
    this.time = React.createRef();
    this.otherNotes = React.createRef();
  }

  static displayName = __dirname.replace('src/slices/', '')

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      displayName: this.displayName.current.value,
      text: this.text.current.value,
      location: this.location.current.value,
      time: this.time.current.value,
      otherNotes: this.otherNotes.current.value,
      narrativeId: this.props.narrativeId
    })
  }

  render() {
    const { showTitle, displayName, location, text, time, otherNotes } = this.props;

    return (
      <React.Fragment>
        { showTitle &&
          <h1>New Party</h1>
        }

        <Content>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              label="Name"
              defaultValue={displayName}
              ref={this.displayName} />

            <TextInput
              label="Location"
              defaultValue={location}
              ref={this.location} />

            <TextareaInput
              label="About"
              defaultValue={text}
              ref={this.text} />

            <TextInput
              label="Time"
              defaultValue={time}
              ref={this.time} />

            <TextareaInput
              label="Other Notes"
              defaultValue={otherNotes}
              ref={this.otherNotes} />

            <Button value="Save" inverted />
          </form>
        </Content>
      </React.Fragment>
    );
  }
};
