#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const merge = require('lodash.merge')

const srcDir = path.resolve("src")
const iconsDir = path.join(srcDir, 'icons')
const componentsDir = path.join(srcDir, 'components')

const svgFiles = path.join(iconsDir, "**/*.svg")
const iconsFile = path.join(componentsDir, 'icons.tsx')
const indexFile = path.join(srcDir, 'index.tsx')
const utilsFile = path.join(srcDir, 'utils.tsx')

const writeFile = (filePath, code) => {
  return fs.writeFile(filePath, code, 'utf8').then(() => {
    console.warn('wrote %s', filePath)
  })
}

const svgFilesPaths = globby.sync(svgFiles).filter(filepath => path.parse(filepath).ext === '.svg')

if (svgFilesPaths.length === 0) {
  console.error('No SVG file(s) found')
  process.exit(1)
}

let exitCode = 0

const icons = svgFilesPaths.map(filepath => {
  try {
    const filename = path.parse(filepath).base
    const filenamePattern = /(.+)-([0-9]+).svg$/

    if (!filenamePattern.test(filename)) {
      throw new Error(
        `${filename}: Invalid filename. Please append the height of the SVG to the end of the filename (e.g. alert-16.svg).`
      )
    }

    const [, name, height] = filename.match(filenamePattern)
    const svg = fs.readFileSync(path.resolve(filepath), 'utf8')
    const $ = cheerio.load(svg)
    $('[fill]:not([fill="white"]):not([fill="#FFFFFF"]):not([fill="#FFF"]):not([fill="#fff"]):not([fill="#ffffff"])').attr('fill', 'currentColor')
    const svgElement = $('svg')
    const svgWidth = parseInt(svgElement.attr('width'))
    const svgHeight = parseInt(svgElement.attr('height'))
    const svgViewBox = svgElement.attr('viewBox')
    const svgPath = trimNewlines(svgElement.html()).trim()

    if (!svgWidth) {
      throw new Error(`${filename}: Missing width attribute.`)
    }

    if (!svgHeight) {
      throw new Error(`${filename}: Missing height attribute.`)
    }

    if (!svgViewBox) {
      throw new Error(`${filename}: Missing viewBox attribute.`)
    }

    if (svgHeight !== parseInt(height)) {
      throw new Error(`${filename}: Height in filename does not match height attribute of SVG`)
    }

    const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/

    if (!viewBoxPattern.test(svgViewBox)) {
      throw new Error(
        `${filename}: Invalid viewBox attribute. The viewBox attribute should be in the following format: "0 0 <width> <height>"`
      )
    }

    const [, viewBoxWidth, viewBoxHeight] = svgViewBox.match(viewBoxPattern)

    if (svgWidth !== parseInt(viewBoxWidth)) {
      throw new Error(`${filename}: width attribute and viewBox width do not match.`)
    }

    if (svgHeight !== parseInt(viewBoxHeight)) {
      throw new Error(`${filename}: height attribute and viewBox height do not match.`)
    }

    return {
      name,
      width: svgWidth,
      height: svgHeight,
      path: svgPath
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    // Instead of exiting immediately, we set exitCode to 1 and continue
    // iterating through the rest of the SVGs. This allows us to identify all
    // the SVGs that have errors, not just the first one. An exit code of 1
    // indicates that an error occured.
    // Reference: https://nodejs.org/api/process.html#process_exit_codes
    exitCode = 1
    return null
  }
})

// Exit early if any errors occurred.
if (exitCode !== 0) {
  process.exit(exitCode)
}

const iconsByName = icons.reduce(
  (acc, icon) =>
    merge(acc, {
      [icon.name]: {
        name: `${pascalCase(icon.name)}Icon`,
        heights: {
          [icon.height]: {
            width: icon.width,
            path: icon.path
          }
        }
      }
    }),
  {}
)

const iconPropsType = `size?: number | 'small' | 'medium' | 'large';
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset';`

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const iconsComponents = Object.entries(iconsByName)
  .map(([key, icon]) => ({
    key,
    name: icon.name,
    code: `${GENERATED_HEADER}

import React from 'react'
import { getSvgProps } from '../utils'

export interface ${icon.name}PropsType extends React.SVGProps<SVGSVGElement> {
  ${iconPropsType}
}

export default function ${icon.name}(props: ${icon.name}PropsType) {
  const svgDataByHeight = ${JSON.stringify(icon.heights)}
  return <svg {...getSvgProps({...props, svgDataByHeight})} />
}
    `
  }))
  .sort((a, b) => a.key.localeCompare(b.key))
  .concat({
      key: 'icon',
      name: 'Icon',
      code: `${GENERATED_HEADER}

import React from 'react'

${Object.entries(iconsByName).map(([key, icon]) => (
`import ${icon.name} from "./${icon.name}"`
)).join("\n")}

export interface IconPropsType extends React.SVGProps<SVGSVGElement> {
  ${iconPropsType}
  name: ${Object.entries(iconsByName).map(([key, icon]) => `"${key}"`).join(" | ")};
}

export default function Icon({
  name,
  ...props
}: IconPropsType) {
  switch(name){
    ${Object.entries(iconsByName).map(([key, icon]) => (
    `
    case "${ key }":
      return <${icon.name} {...props} />
      break;
    `
    )).join("")}
    default:
      return null;
  }
}
      `
  })

function writeIndex() {
  const code = `${GENERATED_HEADER}

${iconsComponents.map(({name}) => `export { default as ${name}, ${name}PropsType } from "./components/${name}"`).join('\n')}
  `
  return writeFile(indexFile, code)
}

function writeUtils() {
  const code = `${GENERATED_HEADER}

import React from 'react'

const sizes: any = {
  small: 12,
  medium: 16,
  large: 24
}

function getClosestSvgHeight(svgHeights: string[], height: number) {
  return svgHeights
    .map(svgHeight => parseInt(svgHeight, 10))
    .reduce(
      (acc: number, svgHeight: number) => (
        svgHeight <= height
        ? svgHeight
        : acc
      ), parseInt(svgHeights[0])
    )
}

interface GetSvgPropsType extends React.SVGProps<SVGSVGElement> {
  ${iconPropsType}
  svgDataByHeight: any;
}

export function getSvgProps({
  'aria-label': ariaLabel,
  svgDataByHeight,
  size = 16,
  verticalAlign = 'text-bottom',
  ...props
}: GetSvgPropsType) {
  const height = sizes[size] || size
  const svgHeight = getClosestSvgHeight(Object.keys(svgDataByHeight), height)
  const svgWidth = svgDataByHeight[svgHeight].width
  const width = height * (svgWidth / svgHeight)
  const path = svgDataByHeight[svgHeight].path

  return {
    'aria-hidden': !!ariaLabel ? false : true,
    'aria-label': ariaLabel,
    role: 'img',
    viewBox: \`0 0 \${svgWidth} \${svgHeight}\`,
    width,
    height,
    fill: 'currentColor',
    style: {
      display: 'inline-block',
      verticalAlign
    },
    dangerouslySetInnerHTML: {__html: path},
    ...props
  }
}
  `
  return writeFile(utilsFile, code)
}

function writeIcons() {
  return Promise.all(iconsComponents.map(({ name, code }) => {
    const iconFile = path.join(componentsDir, `${name}.tsx`)
    return writeFile(iconFile, code)
  }))
}

fs
  .mkdirs(srcDir)
  .then(() => writeIndex())
  .then(() => writeUtils())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

fs
  .mkdirs(componentsDir)
  .then(() => writeIcons())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
