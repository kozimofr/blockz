import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

import StarRatingBase, { StarRatingBasePropsType } from "./Base"

export interface StarRatingPropsType extends StarRatingBasePropsType {
  ratingIsHidden?: boolean;
  reviewsCount?: number;
}

export default function StarRating({
  reviewsCount,
  size = 'small',
  ratingIsHidden = false,
  className,
  rating,
  ...props
}: StarRatingPropsType): JSX.Element {
  return (
    <div className={classNames("flex items-center", className)}>
      {!ratingIsHidden && (
        <div className={classNames({
          [styles.textPositionLeft]: true,
          [styles.textSizeSmall]: size === 'small',
          [styles.textSizeMedium]: size === 'medium',
          [styles.textSizeLarge]: size === 'large',

        })}>{ rating }</div>
      )}
      <StarRatingBase
        size={size}
        rating={rating}
        {...props}
      />
      {!!reviewsCount && (
        <div className={classNames({
          [styles.textPositionRight]: true,
          [styles.textSizeSmall]: size === 'small',
          [styles.textSizeMedium]: size === 'medium',
          [styles.textSizeLarge]: size === 'large',
        })}>({ reviewsCount } Avis)</div>
      )}
    </div>
  );
}
