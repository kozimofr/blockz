import React from 'react';
import noop from 'lodash/noop';

import TextInputBase, { TextInputBasePropsType } from "./Base"

export interface TextInputPropsType extends Omit<TextInputBasePropsType, "onChange"> {
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, TextInputPropsType>(
  function TextInput(
    {
      onChange = noop,
      ...props
    }: TextInputPropsType,
    outerRef,
  ): JSX.Element {
    return (
      <TextInputBase
        {...props}
        ref={outerRef}
        onChange={(e): void => onChange(e.target.value, e)}
      />
    );
  }
)
