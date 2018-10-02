// Karma configuration
// Generated on Tue Sep 25 2018 14:34:02 GMT+0100 (GMT Daylight Time)

const { resolve } = require('path');
const webpackTestConfig = require('./webpack.config.js')((env = 'test'));

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: resolve(''),

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    webpack: webpackTestConfig,

    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true,
      },
    },

    // list of files / patterns to load in the browser
    files: ['**/*.spec.tsx', '**/*.spec.ts'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      '**/*.tsx': ['sourcemap'],
      '**/*.ts': ['sourcemap'],
      '**/*.spec.tsx': ['webpack', 'sourcemap'],
      '**/*.spec.ts': ['webpack', 'sourcemap'],
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-chrome-launcher',
    ],

    logLevel: config.LOG_INFO,

    failOnEmptyTestSuite: false,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
