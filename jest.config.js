module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  resetMocks: true,
  clearMocks: true,
  bail: 1,
  testTimeout: 300000,
  maxWorkers: 1,
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      statements: 80,
      functions: 80
    }
  }
};
