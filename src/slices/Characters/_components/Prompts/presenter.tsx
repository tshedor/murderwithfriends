import * as React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '+dumb/Inputs'
import { NumberedList } from '+dumb/Lists'

type PresenterProps = {
  onUpdate: Function
  answersWithPrompts: _types.PromptAnswer[]
  isCharacter: boolean
}

export default class extends React.Component<PresenterProps, {}> {
  static propTypes = {
    answersWithPrompts: PropTypes.array,
    isCharacter: PropTypes.bool.isRequired
  }

  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    answersWithPrompts: []
  }

  handlePromptAnswer(promptAnswerId, e) {
    // Re-rendered anonymous functions or function refs?
    // Only God may judge me.
    const text = e.currentTarget.value;

    this.props.onUpdate({ promptAnswerId, text });
  }

  render() {
    const { answersWithPrompts, isCharacter } = this.props;

    return (
      <NumberedList
        data={answersWithPrompts}
        render={(item, promptId) => (
          <React.Fragment>
            <span>
              {item.prompt.text}? &nbsp;
            </span>

            {isCharacter ? (
              <TextInput
                defaultValue={item.text}
                onKeyUp={this.handlePromptAnswer.bind(this, item.id)}
                />
            ) : (
              <strong>
                {item.text}
              </strong>
            )}
          </React.Fragment>
        )} />
    );
  }
};
