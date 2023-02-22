import { createElement, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Title.module.scss';

export interface TitlePropsType {
  children: ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Title({
  children,
  id,
  size = 1,
  className,
  heading,
  onClick,
  style
}: TitlePropsType): JSX.Element {
  const elementName = !!heading ? `h${heading}` : 'div';

  const props = {
    className: classNames(styles[`title${size}`], className),
    id,
    style,
    onClick
  };

  return createElement(elementName, props, children);
}
