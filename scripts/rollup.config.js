const resolve = require('@rollup/plugin-node-resolve'); // 解析 node_modules 中的模块
const commonjs = require('@rollup/plugin-commonjs'); // 将 CommonJS 模块转换为 ES6 模块
const babel = require('@rollup/plugin-babel'); // 使用 Babel 转换 JavaScript
const terser = require('@rollup/plugin-terser'); // 压缩 JavaScript
const typescript = require('@rollup/plugin-typescript'); // 支持 TypeScript
const filesize = require('rollup-plugin-filesize'); // 计算打包后文件大小
const pkg = require('../package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    { file: pkg.browser, name: pkg.name, format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: ['react', 'antd', '@ant-design/icons', 'numeral'],
  plugins: [
    resolve(), // 解析外部依赖项
    commonjs(), // 将 CommonJS 模块转换为 ES6 模块
    typescript(), // 支持 TypeScript
    babel({
      // 使用 Babel 转换 JavaScript
      exclude: 'node_modules/**', // 忽略 node_modules 目录
      babelHelpers: 'runtime', // 指定 Babel 辅助函数的使用方式
    }),
    terser(), // 压缩 JavaScript
    filesize(),
  ],
};
