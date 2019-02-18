import * as React from 'react'
import styles from './styles.css';

interface PageTitleProps {
  title: string
  className?: string
  children?: React.ReactNode
}

export class PageTitle extends React.PureComponent<PageTitleProps> {
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

interface HelperProps {
  children: React.ReactNode
}

export const Helper = ({ children }: HelperProps) => (
  <div className={styles.helper}>{children}</div>
);
