module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'react-app', 'airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    // 这里填入你的项目需要的个性化配置
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    yoda: [2, 'always'],
    'no-undefined': 1,
    'no-debugger': 1,
    'no-plusplus': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/label-has-for': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'jsx-a11y/control-has-associated-label': 0,
    'react/destructuring-assignment': 1,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
  ignorePatterns: ['build', 'dist', 'node_modules'],
};
