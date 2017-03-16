"use strict";

module.exports = function (grunt) {
	grunt.initConfig({
		mocha_istanbul: {
			coverage: {
				src: ['unit_tests', 'src'],
				options: {
					mask: '*.js'
				}
			}
		},
		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage*',
					check: {
						lines: 70,
						statements: 70
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.registerTask('test', ['mocha_istanbul:coverage', 'istanbul_check_coverage']);
};