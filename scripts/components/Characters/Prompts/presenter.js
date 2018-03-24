import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from 'components/Modules/Inputs'
import Icon from 'components/Modules/Icon'

export default class extends React.Component {
  static propTypes = {
    prompts: PropTypes.array,
    answers: PropTypes.array,
    isCharacter: PropTypes.bool.isRequired
  }

  static displayName = __dirname.replace('scripts/components/', '')

  promptAnswers = {}

  static defaultProps = {
    answers: []
  }

  handlePromptAnswer = e => {
    Object.keys(this.promptAnswers).forEach(key => {
      this.props.onSavePrompt(key, this.promptAnswers[key].value);
    });
  }

  render() {
    const { prompts, answers, isCharacter } = this.props;

    return (
      <ul className="prompts">
        {Object.keys(prompts).map(key =>
          <li key={key}>
            <span>
              {prompts[key]}{answers[key] ? ': ' : '?'}
            </span>

            {isCharacter ? (
              <TextInput
                value={answers[key]}
                onKeyDown={this.handlePromptAnswer}
                inputRef={val => this.promptAnswers[key] = val}
                />
            ) : (
              <React.Fragment>
                {answers[key]}
              </React.Fragment>
            )}
          </li>
        )}
      </ul>
    );
  }
};
