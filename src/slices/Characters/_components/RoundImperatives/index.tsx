import * as React from 'react'

import { NumberedList } from '+dumb/Lists'
import { Section, Content } from '+dumb/Layouts'

const instructionItem = item => (
  <React.Fragment>
    <strong>{ item.isOptional && 'OPTIONAL: ' }</strong>
    {item.text}
  </React.Fragment>
);

const LineBreakify = ({ text }) => (
  <React.Fragment>
    {text.split('\n').map((paragraph, i) =>
      <p key={i}>
        {paragraph}
      </p>
    )}
  </React.Fragment>
);

interface PresenterProps {
  round?: _types.Round
}

const renderClue = item => item.text

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { round } = this.props;

    if (!round) return null;

    return (
      <React.Fragment>
        {round.text &&
          <Content title="Updates">
            <LineBreakify text={round.text} />
          </Content>
        }

        {round.instructions &&
          <Section title="Instructions">
            <NumberedList
              data={round.instructions}
              render={instructionItem} />
          </Section>
        }

        {round.clues &&
          <Section title="Clues">
            <NumberedList
              data={round.clues}
              render={renderClue} />
          </Section>
        }
      </React.Fragment>
    );
  }
};
