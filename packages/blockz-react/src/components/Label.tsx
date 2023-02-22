import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Label.module.scss';

export interface LabelPropsType {
  children: ReactNode;
  hasError?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Label({
  children,
  hasError,
  isDisabled,
  isReadOnly,
  className,
  onClick,
  style
}: LabelPropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.label]: true,
        [styles.labelStateError]: !!hasError,
        [styles.labelStateDisabled]: !!isDisabled,
        [styles.labelStateReadOnly]: !!isReadOnly
      }, className)}
      style={style}
      onClick={onClick}
    >
      { children }
    </div>
  )
}
