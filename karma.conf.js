/*
* @Author: David
* @Date:   2016-02-02 10:47:05
* @Last Modified by:   David
* @Last Modified time: 2016-02-02 12:04:58
*/

module.exports = function(config)
{
    config.set({

        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'src/libs/angular.js',
            'src/libs/angular-route.js',
            'src/libs/angular-mocks.js',
            'src/libs/d3.js',

            'src/js/app.js',
            'src/directives/**/*.js',
            'src/modules/**/*.js',
            'src/views/**/**.js',

            // { pattern: 'src/views/**/*.ctrl.js', include: true },
            // { pattern: 'src/views/**/*.spec.js', include: true },
        ],

        // list of files to exlude
        exclude: [
        ],

        // test result reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // web server port
        pot: 9876,

        // enable or disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_INFO
        logLevel: config.LOG_INFO,

        // enable or disable watching file and exicuting tests
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false

    });
};