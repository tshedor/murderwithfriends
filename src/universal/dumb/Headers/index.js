import React from 'react'
import styles from './styles.scss';

export class PageTitle extends React.PureComponent {
  render() {
    const { title, className, children } = this.props;
    
    return (
      <header className={className}>
        <h1>{title}</h1>
        { children &&
    			children
        }
      </header>
    );
  }
};


export const Helper = ({ children }) => (
  <div className={styles.helper}>{children}</div>
);
