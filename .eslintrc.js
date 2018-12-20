module.exports = {
  // parser: 'babel-eslint',
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
    yoda: [2, 'always'],
    'jsx-a11y/anchor-is-valid': 0,
    'no-undefined': 1,
    'no-debugger': 1,
    'import/no-unresolved': 0,
    "jsx-a11y/media-has-caption": 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    // 'prefer-promise-reject-errors': 1,
  },
};
