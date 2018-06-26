import * as React from 'react'
import * as classNames from 'classnames'

const styles = require('./styles.scss')

interface ListProps {
  data: object
  render: (object, string) => JSX.Element[] | JSX.Element
  className?: string
}

interface NumberedListProps extends ListProps {
  iteratorRender?: (object) => string
}

export class SeparatedList extends React.PureComponent<ListProps, {}> {
  render() {
    const { data, render } =  this.props;

    return (
      <ul className={styles.separatedList}>
        {Object.keys(data).map((key, i) => {
          const increment = key || i;
          const item = data[increment];

          return (
            <li key={increment}>
              {render(item, increment)}
            </li>
          );
        })}
      </ul>
    );
  }
};

export class NumberedList extends React.PureComponent<NumberedListProps, {}> {
  render() {
    const { data, render, iteratorRender } =  this.props;

    return (
      <ol className={classNames(styles.numberedList, styles[!iteratorRender && styles.autocount])}>
        {Object.keys(data).map((key, i) => {
          const increment = key || i;
          const item = data[increment];

          return (
            <li key={increment}>
              { iteratorRender &&
                <div className={styles.iterator}>{iteratorRender(item)}</div>
              }

              <div className={styles.inside}>
                {render(item, increment)}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
};
