import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './InputNote.module.scss';

export interface InputNotePropsType {
  children: ReactNode;
  hasError?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function InputNote({
  children,
  hasError,
  className,
  onClick,
  style
}: InputNotePropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.inputNote]: true,
        [styles.inputNoteStateError]: !!hasError
      }, className)}
      style={style}
      onClick={onClick}
    >
      { children }
    </div>
  )
}
