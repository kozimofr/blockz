import React, { ReactNode, useState, useEffect } from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import useCloseOnEscape from "../utils/useCloseOnEscape"
// import useFocusTrap from '../utils/useFocusTrap';
import canUseDOM from '../utils/canUseDOM';

import ConditionalPortal from './ConditionalPortal';

import styles from './Popover.module.scss';

export interface PopoverPropsType {
  children: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: 'small' | 'large' | 'auto';
  borderColor?: 'blue' | 'transparent';
  position?: (
    'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  );
  shouldDisplace?: boolean;
  closeButtonIsHidden?: boolean;
  shouldCloseOnClickOutside?: boolean;
  arrowIsHidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  className?: string;
}

export default function Popover({
    children,
    content,
    onClose,
    isOpen,
    className,
    width = 'auto',
    borderColor = 'blue',
    position = 'top',
    shouldDisplace = true,
    arrowIsHidden = false,
    closeButtonIsHidden = false,
    shouldCloseOnClickOutside = false,
    onClick,
    style
}: PopoverPropsType): JSX.Element {
  const [elementRef, setElementRef] = useState<any | null>(null);
  const [popperRef, setPopperRef] = useState<any | null>(null);
  const [arrowRef, setArrowRef] = useState<any | null>(null);

  const { attributes, styles: popperStyles, update } = usePopper(elementRef, popperRef, {
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

  // const shouldTrapFocus: boolean = canUseDOM && !!elementRef;
  const shouldBindEscListener: boolean = canUseDOM && isOpen;

  useCloseOnEscape(onClose, shouldBindEscListener);
  // useFocusTrap(elementRef, shouldTrapFocus, elementRef);

  useEffect(() => {
    if(isOpen && !!popperRef && shouldCloseOnClickOutside){
      update()

      const handleClickOutside = (e: any) => {
        setTimeout(() => {
          if (!!popperRef && !popperRef.contains(e.target)){
            onClose()
          }
        }, 10)
      }
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
  }, [popperRef, isOpen, shouldCloseOnClickOutside]);

  const placement = !!attributes.popper ? attributes.popper['data-popper-placement'] : null

  return (
    <>
      <div
        className={classNames("inline-block", className)}
        ref={setElementRef}
        style={style}
        onClick={onClick}
      >
        { children }
      </div>
      <ConditionalPortal shouldDisplace={shouldDisplace}>
        <div
          ref={setPopperRef}
          role="dialog"
          className={classNames({
            [styles.popover]: true,
            [styles.popoverStateIsOpen]: isOpen,
            [styles.popoverWidthSmall]: width === 'small',
            [styles.popoverWidthLarge]: width === 'large'
          })}
          style={popperStyles.popper}
          {...attributes.popper}
        >
          <div className={classNames({
            [styles.content]: true,
            [styles.contentHasBorder]: borderColor !== 'transparent'
          })}>
            <div className={classNames({
              [styles.popoverBorder]: true,
              [styles.popoverBorderColorBlue]: borderColor === 'blue'
            })}></div>
            { content }
            {!closeButtonIsHidden && (
              <div className={classNames({
                [styles.closeButton]: true,
                [styles.closeButtonHasBorder]: borderColor !== 'transparent'
              })}>
                <button onClick={onClose}>
                  <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.closeButtonIcon}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {!arrowIsHidden && (
            <div
              ref={setArrowRef}
              className={classNames({
                [styles.arrow]: true,
                [styles.arrowPositionTop]: (
                  placement === 'top'
                  || placement === 'top-start'
                  || placement === 'top-end'
                ),
                [styles.arrowPositionBottom]: (
                  placement === 'bottom'
                  || placement === 'bottom-start'
                  || placement === 'bottom-end'
                ),
                [styles.arrowPositionLeft]: (
                  placement === 'left'
                  || placement === 'left-start'
                  || placement === 'left-end'
                ),
                [styles.arrowPositionRight]: (
                  placement === 'right'
                  || placement === 'right-start'
                  || placement === 'right-end'
                ),
                [styles.arrowColorBlue]: borderColor === 'blue'
              })}
              style={popperStyles.arrow}
            />
          )}
        </div>
      </ConditionalPortal>
    </>
  );
}
