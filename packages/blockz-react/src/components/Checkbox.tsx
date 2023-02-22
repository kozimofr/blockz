import React, { ReactNode } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';

import styles from './Checkbox.module.scss';

export interface CheckboxPropsType {
  isDisabled?: boolean;
  isChecked?: boolean;
  hasError?: boolean;
  children?: ReactNode;
  id?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  isIndeterminate?: boolean;
  checkboxVerticalAlign?: 'top' | 'center';
  value?: string | string[] | number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  style?: React.CSSProperties;
}

export default React.forwardRef<HTMLInputElement, CheckboxPropsType>(
  function Checkbox(
    {
      checkboxVerticalAlign = 'center',
      children,
      hasError,
      id,
      isChecked,
      isDisabled,
      isIndeterminate,
      isRequired,
      name,
      onChange = noop,
      value,
      className,
      onClick,
      style = {}
    }: CheckboxPropsType,
    outerRef
  ): JSX.Element {
    // React adds a `value` attribute (`value=""`) to `input[type="checkbox"]` even if the `value`
    // prop is `undefined`. This prevents the default browser behavior of `value="on"` when the
    // `value` attribute is omitted. We can work around the React behavior and avoid adding
    // `value=""` to the DOM by conditionally creating an object that we then spread onto the
    // element. More context: https://github.com/thumbtack/thumbprint/issues/589
    const valuePropObject = !!value ? { value } : {};

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
      <label
        className={classNames(styles.checkbox, {
          [styles.checkboxVerticalAlignTop]: checkboxVerticalAlign === 'top',
          [styles.checkboxVerticalAlignCenter]: checkboxVerticalAlign === 'center',
        }, className)}
        style={{ ...style, cursor: isDisabled ? "default" : "pointer" }}
        onClick={onClick}
      >
        <input
          ref={outerRef}
          className={styles.input}
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          onChange={(e): void => onChange(e.target.checked, e)}
          disabled={isDisabled}
          required={isRequired}
          {...valuePropObject}
        />

        <div
          className={classNames({
            [styles.checkboxContainer]: true,
            [styles.checkboxContainerStateError]: !!hasError,
            [styles.checkboxContainerStateIndeterminate]: !!isIndeterminate
          })}
        >
          <svg
            className={styles.checkboxCheckedIcon}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="15.232"
              y="4.003"
              width="11.701"
              height="1.879"
              rx=".939"
              transform="rotate(123 15.232 4.003)"
            />
            <rect
              x="8.83"
              y="13.822"
              width="7.337"
              height="1.879"
              rx=".939"
              transform="rotate(-146 8.83 13.822)"
            />
            <path d="M8.072 13.306l1.03-1.586.787.512-1.03 1.586z" />
          </svg>
          <svg
            className={styles.checkboxIndeterminateIcon}
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="12" height="2" />
          </svg>
        </div>

        {!!children && (
          <div className={classNames({
            [styles.text]: true,
            [styles.textStateError]: !!hasError
          })}>
            {children}
          </div>
        )}
      </label>
    );
  }
)
