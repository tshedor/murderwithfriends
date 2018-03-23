import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from 'components/Modules/Inputs'
import Icon from 'components/Modules/Icon'

export default class extends React.Component {
  static propTypes = {
    prompts: PropTypes.object,
    answers: PropTypes.object,
    isCharacter: PropTypes.bool.isRequired
  }

  static displayName = __dirname.replace('scripts/components/', '')

  promptAnswers = {}

  handlePromptAnswer = e => {
    Object.keys(this.promptAnswers).forEach(key => {
      this.props.onSavePrompt(key, this.promptAnswers[key].value);
    });
  }

  render() {
    const { prompts, answers, isCharacter } = this.props;

    return (
      <ul>
        {Object.keys(prompts).map(key =>
          <li>
            <Icon name="help" />
            {prompts[key].text}:

            {isCharacter ? (
              <TextInput
                value={answers[key]}
                onKeyDown={this.handlePromptAnswer}
                inputRef={val => this.promptAnswers[key] = val}
                />
            ) : (
              <React.Fragment>
                {answers[key] || '?'}
              </React.Fragment>
            )}
          </li>
        )}
      </ul>
    );
  }
};
