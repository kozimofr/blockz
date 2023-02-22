import React, { useState } from 'react';
import times from 'lodash/times';
import noop from 'lodash/noop';

import StarRatingBase, { StarRatingBasePropsType, MAX_NUM_STARS } from "./StarRating/Base"

import styles from './StarRatingInput.module.scss';

export interface StarRatingInputPropsType extends Omit<StarRatingBasePropsType, 'rating'> {
  rating?: number | string;
  name?: string;
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, StarRatingInputPropsType>(
  function StarRatingInput(
    {
      rating = 0,
      name,
      onChange = noop,
      className,
      ...props
    }: StarRatingInputPropsType,
    outerRef
  ): JSX.Element {
    const [inputRating, setInputRating] = useState(rating)
    const [hoverRating, setHoverRating] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newRating = parseInt(e.target.value)
      setInputRating(newRating)
      onChange(newRating, e)
    }

    // Use hoverRating when present, otherwise use rating
    const ratingValue = hoverRating || rating || inputRating;

    return (
      <StarRatingBase
        rating={ratingValue}
        onMouseLeave={() => setHoverRating(0)}
        className={className}
        {...props}
      >
        <div className={styles.inputWrap}>
          {times(MAX_NUM_STARS, (index: number) => (
            // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
            <label
              className={styles.label}
              key={index}
              onMouseEnter={(): void => setHoverRating(index + 1)}
            >
              <input
                ref={outerRef}
                className={styles.input}
                type="radio"
                name={name}
                value={index + 1}
                onChange={handleChange}
              />
              {index === 0 ? '1 star' : `${index + 1} stars`}
            </label>
          ))}
        </div>
      </StarRatingBase>
    );
  }
)
