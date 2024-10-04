export default {
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '\\.spec\\.ts$|\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/test/e2e/config/setup/setup-file.js'],
  globalSetup: '<rootDir>/test/e2e/config/setup/global-setup.js',
  globalTeardown: '<rootDir>/test/e2e/config/setup/global-teardown.js',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
