import React, { ReactNode } from "react"
import Text from "./Text"
import { Icon } from "@kozimo/blockz-icons/dist/es"

type IconSize = 'small' | 'medium' | 'large'

export interface ShowMorePropsType {
  children: ReactNode;
  isExpanded: boolean;
  isShrinkable?: boolean;
  className?: string;
  size?: 1 | 2 | 3 | 4;
  chevronIsHidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const iconSizes: IconSize[]  = ["large", "medium", "small", "small"]

export default function ShowMore({
  children,
  onClick,
  isExpanded,
  className,
  size = 2,
  isShrinkable = true,
  chevronIsHidden = false,
  style
}: ShowMorePropsType) {
  return (
    <div className={className} style={style}>
      { children }
      {(!isExpanded || isShrinkable) && (
        <div className="cursor-pointer" onClick={onClick}>
          <Text size={size} className="flex items-center text-blue">
            <span>
            { isExpanded ? "Voir moins" : "Voir plus" }
            </span>
            {!chevronIsHidden && (
              <Icon
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={iconSizes[size - 1]}
                className="ml-1"
              />
            )}
          </Text>
        </div>
      )}
    </div>
  )
}
