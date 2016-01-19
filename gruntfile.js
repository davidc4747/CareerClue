/*
* @Author: David G Chung
* @Date:   2015-06-24 14:02:57
* @Last Modified by:   David
* @Last Modified time: 2016-01-18 22:48:16
*/

module.exports = function(grunt)
{
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	//Configure all grunt tasks
	grunt.initConfig({
		uglify:
		{
			my_target:
			{
				files:
				{
					//Minify database scripts
					// 'webpage/app/min/CallStoredProcedure.min.js': ['webpage/app/modules/DataAccess/CallStoredProcedure.js'],
					// 'webpage/app/min/DBConstants.min.js': ['webpage/app/modules/DataAccess/DBConstants.js'],
					// 'webpage/app/min/BusinessRules.min.js': [
					// 		'webpage/app/modules/BusinessRules/BusinessRules.js',
					// 		'webpage/app/modules/BusinessRules/*.js'
					// 	],

					// //Minify other modules
					// 'webpage/app/min/Session.min.js': ['webpage/app/modules/Session.js'],
					// 'webpage/app/min/Repository.min.js': ['webpage/app/modules/Repository.js'],

					// //Minify contrlers and app.js into 1 file
					// 'webpage/app/min/requestTracker.min.js': [
					// 		'webpage/app/app.js',
					// 		'webpage/app/views/**/*.js',
					// 		'webpage/app/directives/**/*.js'
					// 	]
				}
			}
		},
		compass:
		{
			dev:
			{
				options: { config: 'config.rb'}
			}
		},
		watch:
		{
			options: { livereload: 35729 },
			scripts:
			{
				files: [
					'builds/js/app.js',
					'builds/modules/**/*.js',
					'builds/directives/**/*.js',
					'builds/views/**/*.js'
				],
				tasks: ['uglify']
			},
			sass:
			{
				files: [
					'builds/sass/*.scss',
					'builds/directives/**/*.scss',
					'builds/views/**/*.scss'
				],
				tasks: ['compass:dev']
			}
		}
	});

	//Set default task to watch
	grunt.registerTask('default', 'watch');

};