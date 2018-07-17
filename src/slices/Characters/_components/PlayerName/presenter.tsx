import * as React from 'react'

import { TextInput } from '+dumb/Inputs'

import { Content } from '+dumb/Layouts'

interface PresenterProps {
  onUpdate: (v: string) => void
  isOwner: boolean
  displayName: string
}

export default class extends React.PureComponent<PresenterProps, {}> {
  actor: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props);

    this.actor = React.createRef();
  }

  static displayName = __dirname.replace('src/slices/', '')

  handleChange = e => {
    this.props.onUpdate(this.actor.current.value);
  }

  render() {
    const { isOwner, displayName } = this.props;

    return (
      <Content title="Played by">
        {isOwner ? (
          <TextInput
            defaultValue={displayName}
            onKeyUp={this.handleChange}
            ref={this.actor}
            />
        ) : (
          <React.Fragment>{displayName}</React.Fragment>
        )}
      </Content>
    );
  }
};
