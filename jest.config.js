module.exports = {
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  // setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupTests.js'],
  modulePathIgnorePatterns: ['<rootDir>/example/'],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/scripts/jest/fileMock.js',
    '\\.(css|less)$': '<rootDir>/scripts/jest/styleMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/scripts/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|json)$)': '<rootDir>/scripts/jest/fileTransform.js',
  },
};
