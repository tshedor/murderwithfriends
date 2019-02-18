import * as React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import * as classNames from 'classnames';
import styles from './styles.css';

const determineElementForButton = (path) => {
  if (path) {
    if (/^http/.test(path)) {
      return <a href={path} />
    } else {
      return <Link to={path} />
    }
  }

  return <div />
};

interface PresenterProps {
  component?: React.ComponentElement<{}, null>
  path?: string
  inverted?: boolean
  large?: boolean
  small?: boolean
  className?: string
  iconName?: string
  children?: React.ReactNode
  value?: string
}

class Button extends React.PureComponent<PresenterProps> {
  render() {
    const {
      component,
      path,
      iconName,
      children,
      className,
      large,
      small,
      inverted,
      ...res
    } = this.props;

    const wrapper = component || determineElementForButton(path);

    const filteredClassName = classNames(
      styles.root,
      {
        [styles.large] : large,
        [styles.small] : small,
        [styles.inverted]: inverted
      },
      className
    );

    if (res && res.value) {
      return <input {...res} type="submit" className={filteredClassName} />
    }

    if (iconName) {
      return (
        <wrapper.type
          className={filteredClassName}
          {...wrapper.props}
          {...res}>
          <Icon name={iconName} />
          {children}
        </wrapper.type>
      );
    }

    return <wrapper.type {...wrapper.props} {...res} className={filteredClassName} children={children} />
  }
}

export default Button;
