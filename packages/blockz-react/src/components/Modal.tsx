import React, { ReactNode, useEffect } from 'react'
import classNames from "classnames"
import noScroll from 'no-scroll'

import { CrossIcon } from "@kozimo/blockz-icons/dist/es"
import ConditionalPortal from "./ConditionalPortal"

import styles from "./Modal.module.scss"

export interface ModalPropsType {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  closeButtonIsHidden?: boolean;
  shouldModalScroll?: boolean;
  shouldCloseOnCurtainClick?: boolean;
  width?: 'small' | 'medium' | 'large';
  height?: 'auto' | 'medium' | 'large';
  onClose: () => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Modal({
  children,
  isOpen,
  className,
  width = 'medium',
  height = 'auto',
  closeButtonIsHidden = false,
  shouldModalScroll = true,
  shouldCloseOnCurtainClick = true,
  onClose,
  onClick,
  style
}: ModalPropsType): JSX.Element | null {
  useEffect(() => {
    if(isOpen) noScroll.on()
    else noScroll.off()
  }, [isOpen])

  useEffect(() => {
    return () => {
      noScroll.off()
    }
  }, [])

  const onClickCurtain = (event: any) => {
    if (shouldCloseOnCurtainClick && event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <ConditionalPortal>
      <div role="dialog" aria-label="Modal" tabIndex={-1} style={style} onClick={onClick}>
        <div className={classNames({
          [styles.curtain]: true,
          [styles.curtainOpen]: isOpen
        })} style={{ visibility: isOpen ? "visible" : "hidden" }}>
          <div onClick={onClickCurtain} className={styles.curtainInner}>
            <div className={classNames({
              [styles.modal]: true,
              [styles.modalOpen]: isOpen,
              [styles.modalWidthSmall]: width === 'small',
              [styles.modalWidthMedium]: width === 'medium',
              [styles.modalWidthLarge]: width === 'large',
              [styles.modalHeightMedium]: height === 'medium',
              [styles.modalHeightLarge]: height === 'large',
              [styles.modalShouldScroll]: shouldModalScroll
            })}>
              <div className={classNames(styles.modalContainer, className)}>
                {!closeButtonIsHidden && (
                  <div className={styles.closeButton}>
                    <div className="m-3">
                      <button onClick={onClose}>
                        <CrossIcon size="large"/>
                      </button>
                    </div>
                  </div>
                )}
                <div className={styles.content}>
                  <div className={styles.contentPadding}>
                    { children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConditionalPortal>
  )
}
