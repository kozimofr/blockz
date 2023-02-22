import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from '../utils/canUseDOM';

export interface ConditionalPortalPropsType {
  shouldDisplace?: boolean;
  children?: React.ReactNode;
}

export default function ConditionalPortal({
  shouldDisplace = true,
  children,
}: ConditionalPortalPropsType): JSX.Element | null {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!children) {
    return null;
  }

  return (
    <>
      {
        (isLoaded && canUseDOM && shouldDisplace)
        ? createPortal(children, document.body)
        : children
      }
    </>
  );
}
