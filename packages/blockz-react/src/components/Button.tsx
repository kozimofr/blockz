import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import LoaderDots from './LoaderDots';
import isString from 'lodash/isString';
import { Icon, IconPropsType } from "@kozimo/blockz-icons/dist/es"

import styles from './Button.module.scss';

const kozimoDomainPattern = /^(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)*kozimo\.fr\//;
const rootRelativeUrlPattern = /^\//;
const hashUrlPattern = /^#/;

const isInternalUrl = (href?: string): boolean =>
  isString(`${href}`) && (
    kozimoDomainPattern.test(`${href}`)
    || rootRelativeUrlPattern.test(`${href}`)
    || hashUrlPattern.test(`${href}`)
  )

const getRel = (href?: string, shouldOpenInNewTab = false): string | undefined => {
  if (shouldOpenInNewTab) {
    if (isInternalUrl(href)) {
      return 'noopener';
    }
    return 'noopener noreferrer';
  }
  return undefined;
};

interface AnchorPropsType {
  onClick?: React.MouseEventHandler<any>;
  target: string;
  rel?: string;
  href?: string;
}

const getAnchorProps = ({
  isDisabled,
  shouldOpenInNewTab,
  onClick,
  href
}: {
  isDisabled?: boolean,
  shouldOpenInNewTab?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  href?: string
}): AnchorPropsType => ({
  onClick: isDisabled ? undefined : onClick,
  target: shouldOpenInNewTab ? '_blank' : '_self',
  rel: getRel(href, shouldOpenInNewTab),
  href: isDisabled ? undefined : href
});

export interface ButtonPropsType {
  children?: ReactNode;
  iconLeft?: IconPropsType['name'];
  iconRight?: IconPropsType['name'];
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  shouldOpenInNewTab?: boolean;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'caution';
  variant?: 'solid' | 'outline' | 'inverse';
  size?: 'small' | 'large';
  type?: 'button' | 'submit';
  className?: string;
  style?: React.CSSProperties;
}

const FlexWrapper = ({
  children,
  size
}: {
  children: ReactNode,
  size: 'small' | 'large'
}) => (
  <div className={classNames({
    [styles.flexWrapper]: true,
    [styles.flexWrapperSizeSmall]: size === 'small',
    [styles.flexWrapperSizeLarge]: size === 'large'
  })}>
    { children }
  </div>
)

export default forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonPropsType>(
  function Button(
    {
      children,
      iconLeft,
      iconRight,
      isDisabled = false,
      isLoading = false,
      onClick,
      href,
      shouldOpenInNewTab,
      theme = 'primary',
      variant = 'solid',
      size = 'large',
      type = 'button',
      className,
      style
    }: ButtonPropsType,
    outerRef
  ): JSX.Element {
    const commonProps = {
      disabled: isLoading || isDisabled,
      className: classNames({
        [styles.button]: true,
        [styles.buttonSizeLarge]: size === 'large',
        [styles.buttonSizeSmall]: size === 'small',
        [styles.buttonThemePrimarySolid]: theme === 'primary' && variant === 'solid',
        [styles.buttonThemeSecondarySolid]: theme === 'secondary' && variant === 'solid',
        [styles.buttonThemeTertiarySolid]: theme === 'tertiary' && variant === 'solid',
        [styles.buttonThemeCautionSolid]: theme === 'caution' && variant === 'solid',
        [styles.buttonThemePrimaryOutline]: theme === 'primary' && variant === 'outline',
        [styles.buttonThemeSecondaryOutline]: theme === 'secondary' && variant === 'outline',
        [styles.buttonThemeTertiaryOutline]: theme === 'tertiary' && variant === 'outline',
        [styles.buttonThemeCautionOutline]: theme === 'caution' && variant === 'outline',
        [styles.buttonThemePrimaryInverse]: theme === 'primary' && variant === 'inverse',
        [styles.buttonThemeSecondaryInverse]: theme === 'secondary' && variant === 'inverse',
        [styles.buttonThemeTertiaryInverse]: theme === 'tertiary' && variant === 'inverse',
        [styles.buttonThemeCautionInverse]: theme === 'caution' && variant === 'inverse'
      }, className),
      style
    }

    const iconSize = size === 'large' ? 'large' : 'medium'

    const newChildren = isLoading
    ? (
      <FlexWrapper size={size}>
        <div className={styles.loaderContainer}>
          <div className={styles.absoluteCenter}>
            <LoaderDots theme={variant === "solid" ? "inverse" : theme} size="small" />
          </div>
          <div className="invisible">{children}</div>
        </div>
      </FlexWrapper>
    ) : (
      <FlexWrapper size={size}>
        {!!iconLeft && (
          <div
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasRightChildren]: !!children,
            })}
          >
            <Icon name={iconLeft} size={iconSize}/>
          </div>
        )}
        { children }
        {!!iconRight && (
          <div
            className={classNames({
              [styles.iconContainer]: true,
              [styles.iconContainerHasLeftChildren]: !!children,
            })}
          >
            <Icon name={iconRight} size={iconSize}/>
          </div>
        )}
      </FlexWrapper>
    )

    const isAnchor = !!href
    if (isAnchor) {
      return (
        <a
          {...commonProps}
          {...getAnchorProps({
            isDisabled,
            shouldOpenInNewTab,
            onClick,
            href
          })}
          ref={outerRef as React.Ref<HTMLAnchorElement>}
        >
            { newChildren }
        </a>
      )
    }

    const buttonProps = {
      onClick: isDisabled || isLoading ? undefined : onClick,
      type
    }

    return (
      <button
        {...commonProps}
        {...buttonProps}
        ref={outerRef as React.Ref<HTMLButtonElement>}
      >
        { newChildren }
      </button>
    )
  }
)
