const isDocker = require('is-docker');

module.exports = function (config) {
  config.set({

    client: {
      args: [config.grpcHost],
      grpcHost: config.grpcHost
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*Spec.ts": ["webpack", 'sourcemap']
    },

    // list of files / patterns to load in the browser
    files: ['**/*Spec.ts'],

    // list of files / patterns to exclude
    exclude: [
    ],

    webpack: {
      mode: "development",
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            include: /\.ts$/,
            exclude: /node_modules/,
            loader: "ts-loader"
          }
        ]
      },
      resolve: {
        extensions: [".ts", ".js"]
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    customLaunchers: {
      ChromeHeadlessDockerCompat: {
        base: 'ChromeHeadless',
        flags: isDocker() ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] : []
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
