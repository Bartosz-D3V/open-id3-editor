module.exports = {
  roots: ['<rootDir>/app'],
  verbose: false,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '((\\.|/)test)\\.(tsx|ts)?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  moduleNameMapper: {
    '^@api/(.*)': '<rootDir>/app/api/$1',
    '^@actions/(.*)': '<rootDir>/app/actions/$1',
    '^@reducers/(.*)': '<rootDir>/app/reducers/$1',
    '^@states/(.*)': '<rootDir>/app/states/$1',
    '^@store/(.*)': '<rootDir>/app/store/$1',
    '^@containers/(.*)': '<rootDir>/app/containers/$1',
    '^@components/(.*)': '<rootDir>/app/components/$1',
    '^@hoc/(.*)': '<rootDir>/app/HOC/$1',
  },
  setupTestFrameworkScriptFile: '<rootDir>/enzyme/enzyme.config.js',
};
