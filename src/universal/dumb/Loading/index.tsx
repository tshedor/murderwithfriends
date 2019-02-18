import * as React from 'react'

import styles from './styles.css'

interface PresenterProps {
  color?: string
}

// https://codepen.io/nikhil8krishnan/pen/rVoXJa
export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/universal/dumb/', '')

  static defaultProps = {
    color: '#fff'
  }

  render() {
    const {
      color,
      ...res
    } = this.props;

    return (
      <div className={styles.root}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill={color} d="M59.355 71.012c11.602-5.166 16.822-18.765 11.657-30.367S52.247 23.823 40.645 28.988m1.586 3.563c9.593-4.27 20.906-.003 25.218 9.68s-.088 20.947-9.68 25.218"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>
      </div>
    );
  }
};
