import * as React from 'react'

import { TextInput } from '+dumb/Inputs'

import { Content } from '+dumb/Layouts'

interface PresenterProps {
  onUpdate: (v: string) => void
  isOwner: boolean
  displayName: string
}

export default class extends React.PureComponent<PresenterProps, {}> {
  actor: HTMLInputElement

  static displayName = __dirname.replace('src/slices/', '')

  handleChange = e => {
    this.props.onUpdate(this.actor.value);
  }

  render() {
    const { isOwner, displayName } = this.props;

    return (
      <Content title="Played by">
        {isOwner ? (
          <TextInput
            defaultValue={displayName}
            onKeyUp={this.handleChange}
            inputRef={val => this.actor = val}
            />
        ) : (
          <React.Fragment>{displayName}</React.Fragment>
        )}
      </Content>
    );
  }
};
