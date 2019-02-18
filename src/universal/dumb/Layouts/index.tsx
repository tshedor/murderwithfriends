import * as React from 'react'
import styles from './styles.css'

interface LayoutProps {
  children: React.ReactNode
  text?: string
  title?: string
}

export class Section extends React.PureComponent<LayoutProps, {}> {
  render() {
    const { title, children } = this.props;

    return (
      <div className={styles.section}>
        {title &&
          <h3>{title}</h3>
        }
        {children}
      </div>
    )
  }
}

export class Content extends React.PureComponent<LayoutProps, {}> {
  render() {
    const { title, children } = this.props;

    return (
      <React.Fragment>
        {title &&
          <h3>{title}</h3>
        }
        <div className={styles.content}>
          {children}
        </div>
      </React.Fragment>
    )
  }
}
