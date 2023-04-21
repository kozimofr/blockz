import React from 'react';
import classNames from "classnames"
import Text, { TextPropsType } from "./Text"
let Link: any;
try{
  Link = require('next/link').default
}catch(e){
  Link = undefined
}

import styles from "./Breadcrumbs.module.scss"

export interface BreadcrumbType {
  name: string;
  path?: string;
  onClick?: () => void;
}

export interface BreadcrumbsPropsType {
  breadcrumbs: BreadcrumbType[];
  size?: TextPropsType['size'];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Breadcrumbs({
  breadcrumbs,
  className,
  size = 3,
  onClick,
  style
}: BreadcrumbsPropsType): JSX.Element {
  return (
    <Text
      size={size}
      elementName="ul"
      className={classNames("flex flex-wrap", styles.breadcrumbs, className)}
      style={style}
      onClick={onClick}
    >
      {breadcrumbs.map((breadcrumb, i) => {
        if(i < breadcrumbs.length - 1){
          if(!!breadcrumb.path) {
            if(!!Link){
              return (
                <li key={i}>
                  <Link href={breadcrumb.path}>
                    <a className={styles.link} onClick={breadcrumb.onClick}>
                      { breadcrumb.name }
                    </a>
                  </Link>
                </li>
              )
            } else {
              return (
                <li key={i}>
                  <a href={breadcrumb.path} className={styles.link} onClick={breadcrumb.onClick}>
                    { breadcrumb.name }
                  </a>
                </li>
              )
            }
          } else if(!!breadcrumb.onClick) {
            return (
              <li key={i} className={styles.link} onClick={breadcrumb.onClick}>
                { breadcrumb.name }
              </li>
            )
          }
        }
        return (
          <li key={i}>
            { breadcrumb.name }
          </li>
        )
      })}
    </Text>
  )
}
