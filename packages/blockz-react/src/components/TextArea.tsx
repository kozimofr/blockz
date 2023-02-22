import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Label from "./Label"
import InputNote from "./InputNote"
import noop from 'lodash/noop';

import styles from './TextArea.module.scss';

type UiState = 'disabled' | 'error' | 'default';

const getUIState = ({
  hasError,
  isDisabled,
}: Pick<TextAreaPropsType, 'isDisabled' | 'hasError'>): UiState => {
  if (!!isDisabled) {
    return 'disabled';
  }
  if (!!hasError) {
    return 'error';
  }
  return 'default';
};

export interface TextAreaPropsType {
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  maxLength?: number;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  label?: ReactNode;
  note?: ReactNode;
  rows?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  style?: React.CSSProperties;
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaPropsType>(
  function TextArea (
    {
      hasError,
      id,
      isDisabled,
      isReadOnly,
      isRequired,
      maxLength,
      onBlur,
      onChange = noop,
      onFocus,
      placeholder,
      value,
      name,
      className,
      label,
      note,
      rows = 4,
      onClick,
      style
    }: TextAreaPropsType,
    outerRef
  ): JSX.Element {
    const uiState = getUIState({ hasError, isDisabled });

    return (
      <div className={className} style={style} onClick={onClick}>
        {!!label && (
          <Label {...{ hasError, isDisabled }} className="mb-1">{ label }</Label>
        )}
        <textarea
          className={classNames({
            [styles.textArea]: true,
            [styles.textAreaStateDisabled]: uiState === 'disabled',
            [styles.textAreaStateError]: uiState === 'error',
            [styles.textAreaStateDefault]: uiState === 'default',
          })}
          ref={outerRef}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          maxLength={maxLength}
          required={isRequired}
          placeholder={placeholder}
          value={value}
          onChange={(e): void => onChange(e.target.value, e)}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          rows={rows}
        />
        {!!note && (
          <InputNote className="mt-1" hasError={hasError}>{ note }</InputNote>
        )}
      </div>
    )
  }
)
