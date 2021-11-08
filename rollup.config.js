const Package = require('./package.json')
import RollupResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupBabel from '@rollup/plugin-babel'
import Server from 'rollup-plugin-serve'
import { terser } from "rollup-plugin-terser"
const { join } = require('path')
const resolveApp = (path) => join(__dirname, './', path)

// 应被保留在外部的依赖
export default {
  input: resolveApp('src/index.ts'),
  output: [
    {
      file: resolveApp(Package.main),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: resolveApp(Package.module),
      format: 'esm',
      sourcemap: true
    },
    {
      file: resolveApp(Package.iife),
      format: 'iife',
      sourcemap: true,
      name: 'backup'
    }
  ],
  plugins: [
    RollupResolve({
      customResolveOptions: {
        moduleDirectories: [ 'node_modules' ]
      }
    }),
    RollupCommonjs(),
    RollupTypescript(),
    RollupBabel({
      babelHelpers: 'bundled',
      configFile: resolveApp('./babel.config.js')
    }),
  ].concat(
    process.env.NODE_ENV === 'development' ?
    [
      Server({
        open: true,
        openPage: 'public/index.html',
        contentBase: ['public', 'dist'],
        port: 9000
      })
    ] :
    [
      terser()
    ]
  )
}
