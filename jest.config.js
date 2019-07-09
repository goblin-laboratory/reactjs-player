module.exports = {
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  // setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupTests.js'],
  modulePathIgnorePatterns: ['<rootDir>/example/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/scripts/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|json)$)': '<rootDir>/scripts/jest/fileTransform.js',
  },
};
