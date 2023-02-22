import React, { ReactNode } from 'react';
import clamp from 'lodash/clamp';
import noop from 'lodash/noop';
import classNames from 'classnames';

import styles from './Base.module.scss';

// Total number of stars
export const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

export interface StarRatingBasePropsType {
  rating: number | string;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function StarRatingBase({
  rating,
  size = 'small',
  children,
  onMouseLeave = noop,
  className,
  onClick,
  style
}: StarRatingBasePropsType): JSX.Element {
  // Limit rating to between 0 and MAX_NUM_STARS
  // @ts-ignore
  const clampedRating = clamp(rating, 0, MAX_NUM_STARS);

  // Round rating to PRECISION (e.g, 2.7 --> 2.5).
  const ratingValue = Math.round(clampedRating / PRECISION) * PRECISION;

  return (
    <div
      className={classNames({
        [styles.starRating]: true,
        [styles.starRatingSizeSmall]: size === 'small',
        [styles.starRatingSizeMedium]: size === 'medium',
        [styles.starRatingSizeLarge]: size === 'large',
      }, className)}
      data-star={ratingValue}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    >
      { children }
    </div>
  );
}
