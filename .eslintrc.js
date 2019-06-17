module.exports = {
  // parser: 'babel-eslint',
  extends: ['react-app', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react', 'react-hooks'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // React: false,
    // ReactDOM: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  // settings: {
  //   version: require('./package.json').peerDependencies.react,
  // },
};
