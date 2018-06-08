const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: './index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['os', 'fs', 'child_process', 'path'],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs(),
  ],
};
