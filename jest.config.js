const path = require('path')

const coveragePathIgnorePatterns = [
  '__tests__',
  'app.ts',
  'app.tsx',
  'globals.d.ts',
  'routes.ts',
  'errors.ts',
  'system.ts'
]

module.exports = {
  verbose: true,
  rootDir: '.',
  roots: ['./src'],
  projects: [
    {
      displayName: 'react app',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/webapp/**/*.test.tsx'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
      },
      moduleNameMapper: {
        '@intf/(.*)': '<rootDir>/src/_intf/$1',
        '@webapp/(.*)': '<rootDir>/src/webapp/$1'
      },
      runner: 'jest-serial-runner',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      setupFiles: ['./jest.setup.js'],
      setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
      ],
      watchPathIgnorePatterns: [
        'docker'
      ],
      coveragePathIgnorePatterns
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/server/__tests__/**/*.ts'],
      transform: {
        '^.+\\.(ts)$': 'ts-jest'
      },
      moduleNameMapper: {
        '@intf/(.*)': '<rootDir>/src/_intf/$1'
      },
      runner: 'jest-serial-runner',
      moduleFileExtensions: ['ts', 'js'],
      watchPathIgnorePatterns: [
        'docker'
      ],
      setupFiles: ['./jest.setup.js'],
      coveragePathIgnorePatterns
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/api/__tests__/**/*.ts'],
      transform: {
        '^.+\\.(ts)$': 'ts-jest'
      },
      moduleNameMapper: {
        '@intf/(.*)': '<rootDir>/src/_intf/$1'
      },
      watchPathIgnorePatterns: [
        'docker'
      ],
      runner: 'jest-serial-runner',
      moduleFileExtensions: ['ts', 'js'],
      setupFiles: ['./jest.setup.js'],
      coveragePathIgnorePatterns
    }
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{tsx,ts}'
  ],
  coveragePathIgnorePatterns
  /*
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: -10
    }
  }*/
}