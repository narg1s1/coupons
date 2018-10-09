// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-phantomjs-launcher')
        ],
        client: {
            clearContext: false
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'test'
        },
        browsers: ['PhantomJS'],
        colors: true,
        port: 9876,
        preprocessors: {
            '**/src/app/*.ts': 'coverage'
        },
        reporters: ['progress', 'kjhtml', 'coverage'],
        coverageReporter: {
            type: 'text',
            dir: 'app/test/coverage/'
        },
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    });
};
