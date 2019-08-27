module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
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
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    yoda: [2, 'always'],
    'no-undefined': 1,
    'no-debugger': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/label-has-for': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'react/destructuring-assignment': 1,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
  },
};
