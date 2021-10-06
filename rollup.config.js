import ts2 from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import node from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import path from 'path'
import { builtinModules } from 'module'

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    ts2({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      useTsconfigDeclarationDir: true
    }),
    node(),
    cjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: ["node_modules/**"],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.es', '.mjs'],
      presets: [
        [
          "@babel/env", 
          {
          modules: false
          }
        ],
      ],
      plugins: [
        "@babel/plugin-external-helpers",
        [
          "@babel/plugin-transform-runtime",
          {
            "corejs": { version: 3, proposals: true },
            "useESModules": true
          }
        ]
      ]
    }),
    terser({
      mangle: true
    })
  ],
  external: [
    "native-reg",
    ...builtinModules
  ],
  output: [
    {
      dir: "dist/cjs",
      // file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true
    },
    {
      dir: "dist/esm",
      // file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  ]
})
