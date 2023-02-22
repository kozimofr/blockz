import React, { ReactNode } from "react"
import classNames from "classnames"
import queryString from 'query-string'
import range from "lodash/range"
import { ArrowLeftIcon, ArrowRightIcon } from "@kozimo/blockz-icons/dist/es"
let useRouter: any;
let Link: any;
try{
  useRouter = require('next/router').useRouter
  Link = require('next/link').default
}catch(e){
  useRouter = () => null
  Link = undefined
}

import styles from "./Pagination.module.scss"

const getPath = () => {
  if(typeof window !== 'undefined'){
    return `${window.location.pathname}${window.location.search}`
  }else{
    return ""
  }
}

const getPrevPages = (Component: any, page: number, props: {[key: string]: any} = {}) => {
  const min = page - 2 > 1
  ? page - 1
  : 1

  return (min === 1 ? [] : [
    <Component key={1} page={1} {...props}>1</Component>
  ])
  .concat(min > 2 ? [
    <span key={page} className="mx-1">...</span>
  ] : [])
  .concat(range(min, page).map((p: number) => (
    <Component key={p} page={p} {...props}>{ p }</Component>
  )))
}

const getNextPages = (Component: any, page: number, pagesCount: number, props: {[key: string]: any} = {}) => {
  const max = page + 2 < pagesCount
  ? page + 1
  : pagesCount

  return range(page + 1, max + 1).map((p: number) => (
    <Component key={p} page={p} {...props}>{ p }</Component>
  ))
  .concat(max < pagesCount - 1 ? [
    <span key={page} className="mx-1">...</span>
  ] : [])
  .concat(max === pagesCount ? [] : [
    <Component key={pagesCount} page={pagesCount} {...props}>{ pagesCount }</Component>
  ])
}

/*
* PAGINATION USING URL PARAM QUERY
*/

interface QueryPagePropsType {
  page: number;
  query: {[key: string]: any};
  isDisabled?: boolean;
  children?: ReactNode;
}

const QueryPage = ({
  page,
  query,
  children,
  isDisabled=false
}: QueryPagePropsType): JSX.Element => {
  const router = useRouter()
  const { url } = queryString.parseUrl(router ? router.asPath : getPath())
  const params = queryString.stringify({
    ...query,
    page: page === 1 ? undefined : page
  })
  const newUrl = url + (params !== "" ? `?${params}` : "")

  const anchorProps = {
    className: classNames(styles.link, { [styles.disabled]: isDisabled })
  }

  const link = Link ? (
    <Link href={newUrl}>
      <a {...anchorProps}>
        { children }
      </a>
    </Link>
  ) : (
    <a href={newUrl} {...anchorProps}>
      { children }
    </a>
  )

  return !isDisabled ? link : <div {...anchorProps}>{ children }</div>
}

export interface QueryPaginationPropsType {
  pagesCount: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export function QueryPagination({
  pagesCount,
  className,
  onClick,
  style
}: QueryPaginationPropsType): JSX.Element | null {
  const router = useRouter()
  const { query } = queryString.parseUrl(router ? router.asPath : getPath())
  const page = query.page ? +query.page : 1

  if(pagesCount < 2) return null

  return (
    <div
      className={classNames("flex justify-center items-center", className)}
      style={style}
      onClick={onClick}
    >
      <QueryPage isDisabled={page === 1} page={page - 1} query={query}>
        <small><ArrowLeftIcon/></small> <span className="hidden large:block ml-2">Précédent</span>
      </QueryPage>
      { getPrevPages(QueryPage, page, { query }) }
      <span className={classNames(styles.link, styles.active)}>{ page }</span>
      { getNextPages(QueryPage, page, pagesCount, { query }) }
      <QueryPage isDisabled={page === pagesCount} page={page + 1} query={query}>
        <span className="hidden large:block mr-2">Suivant</span> <small><ArrowRightIcon/></small>
      </QueryPage>
    </div>
  )
}


/*
* PAGINATION USING URL PARAM QUERY
*/

interface PathPagePropsType {
  page: number;
  path: string;
  isDisabled?: boolean;
  children?: ReactNode;
}

const PathPage = ({
  page,
  path,
  children,
  isDisabled=false
}: PathPagePropsType): JSX.Element => {
  const url = path + (
    page !== 1
    ? `${path.endsWith("/") ? "" : "/"}${page}`
    : `${path === "" ? "/" : ""}`
  )

  const anchorProps = {
    className: classNames(styles.link, { [styles.disabled]: isDisabled })
  }

  const link = Link ? (
    <Link href={url}>
      <a {...anchorProps}>
        { children }
      </a>
    </Link>
  ) : (
    <a href={url} {...anchorProps}>
      { children }
    </a>
  )

  return !isDisabled ? link : <div {...anchorProps}>{ children }</div>
}

export interface PathPaginationPropsType {
  pagesCount: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export function PathPagination({
  pagesCount,
  className,
  onClick,
  style
}: PathPaginationPropsType): JSX.Element | null {
  const router = useRouter()
  const { url } = queryString.parseUrl(router ? router.asPath : getPath())
  const urlSplit = url.split("/")
  const lastItemOfUrl = urlSplit[urlSplit.length - 1]

  // If the last item is a number, then we know that we're on a page
  let page;
  let path;
  if(/^\d+$/.test(lastItemOfUrl)){
    page = parseInt(lastItemOfUrl)
    path = urlSplit.slice(0,-1).join("/")
  }else{
    page = 1
    path = url
  }

  if(pagesCount < 2) return null

  return (
    <div
      className={classNames("flex justify-center items-center", className)}
      style={style}
      onClick={onClick}
    >
      <PathPage isDisabled={page === 1} page={page - 1} path={path}>
        <small><ArrowLeftIcon/></small> <span className="hidden large:block ml-2">Précédent</span>
      </PathPage>
      { getPrevPages(PathPage, page, { path }) }
      <span className={classNames(styles.link, styles.active)}>{ page }</span>
      { getNextPages(PathPage, page, pagesCount, { path }) }
      <PathPage isDisabled={page === pagesCount} page={page + 1} path={path}>
        <span className="hidden large:block mr-2">Suivant</span> <small><ArrowRightIcon/></small>
      </PathPage>
    </div>
  )
}

/*
* PAGINATION USING LOCAL STATE AND CLICK
*/

interface StatePagePropsType {
  isDisabled?: boolean;
  children?: ReactNode;
  onClick(page: number): void;
  page: number;
}

const StatePage = ({
  onClick,
  children,
  isDisabled=false,
  page
}: StatePagePropsType): JSX.Element => {
  const buttonProps = {
    className: classNames(styles.link, { [styles.disabled]: isDisabled })
  }

  return !isDisabled ? (
    <button {...buttonProps} onClick={() => onClick(page)}>
      { children }
    </button>
  ) : <div {...buttonProps}>{ children }</div>
}

export interface StatePaginationPropsType {
  pagesCount: number;
  page: number;
  className?: string;
  onClick(page: number): void;
  style?: React.CSSProperties;
}

export function StatePagination({
  pagesCount,
  page,
  onClick,
  className,
  style
}: StatePaginationPropsType): JSX.Element | null {
  if(pagesCount < 2) return null

  return (
    <div
      className={classNames("flex justify-center items-center", className)}
      style={style}
    >
      <StatePage isDisabled={page === 1} page={page - 1} onClick={onClick}>
        <small><ArrowLeftIcon/></small> <span className="hidden large:block ml-2">Précédent</span>
      </StatePage>
      { getPrevPages(StatePage, page, { onClick }) }
      <span className={classNames(styles.link, styles.active)}>{ page }</span>
      { getNextPages(StatePage, page, pagesCount, { onClick }) }
      <StatePage isDisabled={page === pagesCount} page={page + 1} onClick={onClick}>
        <span className="hidden large:block mr-2">Suivant</span> <small><ArrowRightIcon/></small>
      </StatePage>
    </div>
  )
}
