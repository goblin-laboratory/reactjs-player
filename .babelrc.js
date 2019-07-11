module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  // plugins: ['@babel/plugin-proposal-class-properties'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};
