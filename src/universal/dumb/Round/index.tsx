import * as React from 'react'

import Icon from '+dumb/Icon'
import { NumberedList } from '+dumb/Lists'
import { Section, Content } from '+dumb/Layouts'
import { Helper } from '+dumb/Headers'

const styles = require('./styles.scss');

function roundName(roundId: number) {
  if (roundId === 0) {
    return 'Pre-Party';
  }

  return `Round ${roundId}`;
}

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
  round?: _types.Round,
  roundId?: any
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { round, roundId } = this.props;
    const helperText = round.roundText || round.text;
    const name = roundName(roundId);

    return (
      <div className={styles.rounds}>
        <header>
          <h2>{name}</h2>

          <Helper children={helperText} />
        </header>

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
                render={item => item.text} />
            </Section>
          }
        </React.Fragment>
      </div>
    );
  }
};
