import * as React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import * as classNames from 'classnames';
import styles from './styles.scss';

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


class Button extends React.PureComponent {
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

    if (res?.value) {
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
