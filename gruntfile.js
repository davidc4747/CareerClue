/*
* @Author: David G Chung
* @Date:   2015-06-24 14:02:57
* @Last Modified by:   David
* @Last Modified time: 2016-04-07 13:29:06
*/

module.exports = function(grunt)
{
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-karma');

	//Configure all grunt tasks
	grunt.initConfig({
		uglify:
		{
			my_target:
			{
				files:
				{
					//Minify database scripts
					'src/js/CallStoredProcedure.min.js': ['src/modules/DataAccess/CallStoredProcedure.js'],
					'src/js/DBConstants.min.js': ['src/modules/DataAccess/DBConstants.js'],
					'src/js/BusinessRules.min.js': [
							'src/modules/BusinessRules/BusinessRules.js',
							'src/modules/BusinessRules/*.js'
						],

					//Minify other modules
					'src/js/Authenticator.min.js': ['src/modules/Authenticator.js'],
					'src/js/Recovery.min.js': ['src/modules/Recovery.js'],
					'src/js/Repository.min.js': ['src/modules/Repository.js'],

					//Minify contrlers and app.js into 1 file
					'src/js/CareerClue.min.js': [
							'src/js/app.js',
							'src/views/**/*.ctrl.js',
							'src/directives/**/*.dirc.js'
						]
				}
			}
		},
		compass:
		{
			dev:
			{
				options: { config: 'config.rb' }
			}
		},
		karma:
		{
			unit:
			{
				configFile: 'karma.conf.js',
				background: true,
				autoWatch: false,
				singleRun: false,
			}
		},
		watch:
		{
			options: { livereload: 35729 },
			scripts:
			{
				files: [
					'src/js/app.js',
					'src/modules/**/*.js',
					'src/directives/**/*.js',
					'src/views/**/*.js'
				],
				tasks: ['uglify', 'karma:unit:run']
			},
			sass:
			{
				files: [
					'src/sass/*.scss',
					'src/directives/**/*.scss',
					'src/views/**/*.scss'
				],
				tasks: ['compass:dev']
			}
		}
	});

	//Set default task to watch
	grunt.registerTask('default', ['karma:unit:start', 'watch']);

};