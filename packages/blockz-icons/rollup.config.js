import path from 'path'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from "rollup-plugin-terser"

const { peerDependencies } = require('./package.json')

const formats = [{
  name: 'es',
  preserveModules: true,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.join('dist', 'es')
        }
      }
    })
  ],
}, {
  name: 'cjs',
  preserveModules: false,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.join('dist', 'cjs')
        }
      }
    })
  ],
}]

module.exports = formats.map(format => ({
  input: './src/index.tsx',
  plugins: [
    babel(),
    commonjs(),
    terser(),
    ...format.plugins
  ],
  output: {
    dir: path.join('dist', format.name),
    format: format.name,
    preserveModules: format.preserveModules,
    preserveModulesRoot: 'src',
    globals: {
      'react': 'React'
    }
  },
  external: id =>
    // Don't attempt to bundle peerDependencies.
    peerDependencies[id]
}))
