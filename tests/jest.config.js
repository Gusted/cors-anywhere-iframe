module.exports = {
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': './tests/utils/esbuild-transform.js'
    },
    testRegex: 'tests/.*\\.tests\\.ts$',
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    rootDir: '../',
    collectCoverage: false,
    coverageDirectory: 'tests/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
    ],
};