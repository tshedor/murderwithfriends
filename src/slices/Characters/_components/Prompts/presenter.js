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

  static defaultProps = {
    prompts: [],
    answers: [],
  }

  handlePromptAnswer(promptAnswerId, e) {
    // Re-rendered anonymous functions or function refs?
    // Only God may judge me.
    const text = e.currentTarget.value;

    this.props.onUpdate(promptAnswerId, text);
  }

  mergePromptsWithAnswers(prompts, answers) {
    return prompts.map((text, i) => {
      return {
        id: i,
        text,
        answer: answers[i]
      };
    });
  }

  render() {
    const { prompts, answers, isCharacter } = this.props;
    const answersWithPrompts = this.mergePromptsWithAnswers(prompts, answers);

    return (
      <NumberedList
        data={answersWithPrompts}
        render={(item, promptId) => (
          <React.Fragment>
            <span>
              {item.text}? &nbsp;
            </span>

            {isCharacter ? (
              <TextInput
                defaultValue={item.answer}
                onKeyUp={this.handlePromptAnswer.bind(this, item.id)}
                />
            ) : (
              <strong>
                {item.answer}
              </strong>
            )}
          </React.Fragment>
        )} />
    );
  }
};
