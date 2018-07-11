import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '+dumb/Inputs'
import Icon from '+dumb/Icon'
import { NumberedList } from '+dumb/Lists'
import Loading from '+dumb/Loading'

export default class extends React.Component {
  static propTypes = {
    prompts: PropTypes.object,
    answers: PropTypes.object,
    isCharacter: PropTypes.bool.isRequired
  }

  static displayName = __dirname.replace('src/slices/', '')

  promptAnswers = {}

  static defaultProps = {
    prompts: {},
    answers: {}
  }

  handlePromptAnswer(promptAnswerId, e) {
    // Re-rendered anonymous functions or function refs?
    // Only God may judge me.
    const text = e.currentTarget.value;

    this.props.onUpdate({ promptAnswerId, text });
  }

  render() {
    const { answers, isCharacter } = this.props;
    const prompts = Object.values(this.props.prompts)

    return (
      <NumberedList
        data={prompts}
        render={(item, promptId) => (
          <React.Fragment>
            <span>
              {item.text}? &nbsp;
            </span>

            {isCharacter ? (
              <TextInput
                defaultValue={answers[promptId]?.text}
                onKeyUp={this.handlePromptAnswer.bind(this, answers[promptId]?.id)}
                />
            ) : (
              <strong>
                {answers[promptId]?.text}
              </strong>
            )}
          </React.Fragment>
        )} />
    );
  }
};
