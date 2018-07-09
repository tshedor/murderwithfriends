import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '+dumb/Inputs'
import Icon from '+dumb/Icon'
import { NumberedList } from '+dumb/Lists'
import Loading from '+dumb/Loading'

export default class extends React.Component {
  static propTypes = {
    prompts: PropTypes.array,
    answers: PropTypes.array,
    isCharacter: PropTypes.bool.isRequired
  }

  static displayName = __dirname.replace('src/slices/', '')

  promptAnswers = {}

  static defaultProps = {
    promps: {},
    answers: []
  }

  handlePromptAnswer = e => {
    Object.keys(this.promptAnswers).forEach(key => {
      this.props.onSavePrompt(key, this.promptAnswers[key].value);
    });
  }

  render() {
    const { prompts, answers, isCharacter } = this.props;

    if (!prompts) {
      return <Loading />;
    }

    return (
      <NumberedList
        data={prompts}
        render={(item, key) => (
          <React.Fragment>
            <span>
              {item}? &nbsp;
            </span>

            {isCharacter ? (
              <TextInput
                defaultValue={answers[key]}
                onKeyUp={this.handlePromptAnswer}
                inputRef={val => this.promptAnswers[key] = val}
                />
            ) : (
              <strong>
                {answers[key]}
              </strong>
            )}
          </React.Fragment>
        )} />
    );
  }
};
