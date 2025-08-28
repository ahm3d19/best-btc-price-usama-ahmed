module.exports = {
  verbose: true,
  coverageDirectory: './reports/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 75,
      lines: 72,
      statements: -70,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js', '!node_modules/**'
  ],
  resetMocks: false,
  setupFiles: ['./__mocks__/fetch.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/node-fetchs'],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
