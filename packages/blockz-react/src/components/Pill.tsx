import React, { ReactNode } from "react";
import classNames from 'classnames';

import { Icon, IconPropsType } from "@kozimo/blockz-icons/dist/es";

import styles from './Pill.module.scss';

export interface PillPropsType {
  children: ReactNode;
  icon?: IconPropsType['name'];
  color?: 'pink' | 'blue' | 'turquoise' | 'purple' | 'green' | 'red' | 'orange' | 'yellow';
  className?: string;
  size?: 'large' | 'medium' | 'small';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Pill({
  color,
  icon,
  children,
  className,
  size = 'medium',
  onClick,
  style
}: PillPropsType): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.pill]: true,
        [styles.pillColorPink]: color === 'pink',
        [styles.pillColorBlue]: color === 'blue',
        [styles.pillColorTurquoise]: color === 'turquoise',
        [styles.pillColorPurple]: color === 'purple',
        [styles.pillColorGreen]: color === 'green',
        [styles.pillColorRed]: color === 'red',
        [styles.pillColorOrange]: color === 'orange',
        [styles.pillColorYellow]: color === 'yellow',
        [styles.pillSizeSmall]: size === 'small',
        [styles.pillSizeMedium]: size === 'medium',
        [styles.pillSizeLarge]: size === 'large',
      }, className)}
      style={style}
      onClick={onClick}
    >
      <div className="flex items-center">
        {!!icon && (
          <Icon className="mr-1" size={size} name={icon}/>
        )}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
