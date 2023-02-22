import React from 'react';
import classNames from 'classnames';

import styles from './LoaderDots.module.scss';

export interface LoaderDotsPropsType {
  assistiveText?: string;
  size?: 'small' | 'medium';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'inverse';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function LoaderDots({
  assistiveText = 'Loading',
  size = 'medium',
  theme = 'primary',
  className,
  onClick,
  style
}: LoaderDotsPropsType): JSX.Element {
  const dotClassName = classNames({
    [styles.dot]: true,
    [styles.dotThemePrimary]: theme === 'primary',
    [styles.dotThemeSecondary]: theme === 'secondary',
    [styles.dotThemeTertiary]: theme === 'tertiary',
    [styles.dotThemeCaution]: theme === 'caution',
    [styles.dotThemeInverse]: theme === 'inverse',
    [styles.dotSizeSmall]: size === 'small',
    [styles.dotSizeMedium]: size === 'medium',
  });

  return (
    <div
      className={classNames(styles.loader, className)}
      role="status"
      style={style}
      onClick={onClick}
    >
      <div className={dotClassName} />
      <div className={dotClassName} />
      <div className={dotClassName} />
      <div className={styles.hiddenText}>{assistiveText}</div>
    </div>
  );
}
