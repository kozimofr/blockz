import { createElement, ReactNode, ReactHTML } from 'react';
import classNames from 'classnames';

import styles from './Text.module.scss';

export interface TextPropsType {
  children?: ReactNode | string;
  size?: 1 | 2 | 3 | 4;
  className?: string;
  elementName?: keyof ReactHTML;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Text({
  children,
  size = 2,
  className='',
  elementName = 'p',
  onClick,
  style
}: TextPropsType): JSX.Element {
  const props = {
    className: classNames(
      styles[`text${size}`],
      className
    ),
    onClick,
    style
  };

  return createElement(elementName, props, children);
}
