import React, { ReactNode, useState, useEffect } from 'react';
import assign from 'lodash/assign';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import canUseDOM from "../utils/canUseDOM"

import ConditionalPortal from "./ConditionalPortal"

import styles from './Tooltip.module.scss';

const doesWindowSupportTouch = (): boolean =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

export interface TooltipPropsType {
  children: ReactNode;
  text: ReactNode;
  theme?: 'light' | 'dark';
  position?: 'top' | 'bottom' | 'left' | 'right';
  closeDelayLength?: 0 | 200;
  zIndex?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Tooltip({
  position = 'top',
  theme = 'dark',
  zIndex,
  text,
  children,
  closeDelayLength = 200,
  className,
  onClick = noop,
  style
}: TooltipPropsType): JSX.Element {
  const [elementRef, setElementRef] = useState<any | null>(null);
  const [popperRef, setPopperRef] = useState<any | null>(null);
  const [arrowRef, setArrowRef] = useState<any | null>(null);
  const { attributes, styles: popperStyles } = usePopper(elementRef, popperRef, {
    placement: position,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8],
      }
    }, {
      name: 'preventOverflow',
      options: {
        boundary: 'window',
      }
    }, {
      name: 'arrow',
      options: {
        element: arrowRef
      }
    }],
    positionFixed: false
  })
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTimeout, setOpenTimeout] = useState<number | undefined>(undefined);
  const [closeTimeout, setCloseTimeout] = useState<number | undefined>(undefined);

  const show = (): void => {
    if(closeTimeout){
      window.clearTimeout(closeTimeout);
    }
    setIsOpen(true);
  };

  const hide = (): void => {
    setIsOpen(false);
  };

  const handleFocus = (): void => {
    if(!doesWindowSupportTouch()){
      show();
    }
  };

  const handleMouseEnter = (): void => {
    if(!doesWindowSupportTouch()){
      setOpenTimeout(window.setTimeout(show, 100));
    }
  };

  const handleMouseLeave = (): void => {
    setCloseTimeout(window.setTimeout(hide, closeDelayLength));
    if (openTimeout) {
      clearTimeout(openTimeout);
    }
  };

  const handleClick = (): void => {
    onClick()
    if(doesWindowSupportTouch()){
      if(isOpen){
        hide();
      }else{
        show();
      }
    }
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (canUseDOM && event.keyCode === 27) {
        event.preventDefault();
        hide();
      }
    };

    document.addEventListener('keyup', handleKeyUp);
    return (): void => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const placement = !!attributes.popper ? attributes.popper['data-popper-placement'] : null

  return (
    <>
      <div
        className={classNames("inline-block", className)}
        ref={setElementRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={hide}
        style={style}
      >
        { children }
      </div>
      <ConditionalPortal>
        <div
          ref={setPopperRef}
          role="tooltip"
          className={classNames({
            [styles.tooltip]: true,
            [styles.tooltipStateIsOpen]: isOpen,
            [styles.tooltipThemeDark]: theme === 'dark',
            [styles.tooltipThemeLight]: theme === 'light',
          })}
          style={assign({}, popperStyles.popper, { zIndex })}
          onMouseEnter={show}
          onMouseLeave={handleMouseLeave}
          onClick={(event): void => {
            event.stopPropagation();
            if (doesWindowSupportTouch()) {
              hide();
            }
          }}
          {...attributes.popper}
        >
          <div>{ text }</div>
          <div
            ref={setArrowRef}
            style={popperStyles.arrow}
            className={classNames({
              [styles.arrow]: true,
              [styles.arrowPositionTop]: placement === 'top',
              [styles.arrowPositionBottom]: placement === 'bottom',
              [styles.arrowPositionLeft]: placement === 'left',
              [styles.arrowPositionRight]: placement === 'right',
              [styles.arrowThemeDark]: theme === 'dark',
              [styles.arrowThemeLight]: theme === 'light',
            })}
          />
        </div>
      </ConditionalPortal>
    </>
  )
}
