import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Message.module.scss';

export interface MessagePropsType {
  children?: ReactNode;
  theme?: 'success' | 'caution' | 'warning' | 'info';
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Message({
  children,
  theme = 'info',
  position = 'top',
  className,
  onClick,
  style
}: MessagePropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.message]: true,
        [styles.messageStateSuccess]: theme === 'success',
        [styles.messageStateCaution]: theme === 'caution',
        [styles.messageStateWarning]: theme === 'warning',
        [styles.messageStateInfo]: theme === 'info',
        [styles.messagePositionTop]: position === 'top',
        [styles.messagePositionRight]: position === 'right',
        [styles.messagePositionBottom]: position === 'bottom',
        [styles.messagePositionLeft]: position === 'left'
      }, className)}
      style={style}
      onClick={onClick}
    >
      <div className={styles.messageBorder}></div>
      { children }
    </div>
  );
}
