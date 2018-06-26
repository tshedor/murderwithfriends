import * as React from 'react'

import { TextInput } from '+dumb/Inputs'

import { Content } from '+dumb/Layouts'

interface PresenterProps {
  onSaveActorName: (v: string) => void
  isPartyMaster: boolean
  actorName: string
}

export default class extends React.PureComponent<PresenterProps, {}> {
  actor: HTMLInputElement

  static displayName = __dirname.replace('src/slices/', '')

  handleActorInput = e => {
    this.props.onSaveActorName(this.actor.value);
  }

  render() {
    const { isPartyMaster, actorName } = this.props;

    return (
      <Content title="Played by">
        {isPartyMaster ? (
          <TextInput
            defaultValue={actorName}
            onKeyDown={this.handleActorInput}
            inputRef={val => this.actor = val}
            />
        ) : (
          <React.Fragment>{actorName}</React.Fragment>
        )}
      </Content>
    );
  }
};
