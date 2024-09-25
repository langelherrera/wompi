module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: '../coverage', 
    coverageReporters: ['text', 'lcov'], 
    collectCoverageFrom: ['**/*.ts', '!**/*.module.ts'], 
  };