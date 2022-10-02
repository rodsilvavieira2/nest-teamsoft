import { Config } from '@jest/types';
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
  roots: ['../.'],
  testEnvironment: './prisma-test-environment.ts',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/../../src/$1',
  },
} as Config.InitialOptions;
