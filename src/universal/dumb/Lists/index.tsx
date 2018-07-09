import * as React from 'react'
import * as classNames from 'classnames'

const styles = require('./styles.scss')

interface ListProps {
  render: (object, string) => JSX.Element[] | JSX.Element
  className?: string
  data: any[]
}

interface NumberedListProps extends ListProps {
  iteratorRender?: (object) => string
}

export class SeparatedList extends React.PureComponent<ListProps, {}> {
  render() {
    const { data, render } =  this.props;

    return (
      <ul className={styles.separatedList}>
        {data.map((item, i) => {
          const key = item.id || i;

          return (
            <li key={key}>
              {render(item, key)}
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
        {data.map((item, i) => {
          const key = item.id || i;

          return (
            <li key={key}>
              { iteratorRender &&
                <div className={styles.iterator}>{iteratorRender(item)}</div>
              }

              <div className={styles.inside}>
                {render(item, key)}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
};
