import * as React from 'react';

const icon = require('./icons.svg');
import styles from './styles.scss';

interface IconProps {
  name: string;
  label?: string;
}

const Icon: React.SFC<IconProps> = ({name, label, ...props}) => (
  <svg className={`${styles.root} icon-${name}`} {...props} aria-labelledby="title">
    <title>{label || name}</title>
    <use xlinkHref={`${icon}#${name}`} />
  </svg>
);

export default Icon;
