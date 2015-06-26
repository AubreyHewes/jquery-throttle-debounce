/*jshint node:true*/
module.exports = function (grunt) {
	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({
		"jshint": {
			"src": [
				"jquery.ba-throttle-debounce.js"
			]
		},
		"qunit": {
			"src": [
				"unit/index.html"
			],
			"jquery-1.4.2": [
				"unit/jquery-1.4.2.html"
			],
			"jquery-1.3.2": [
				"unit/jquery-1.3.2.html"
			]
		},
		"uglify": {
			"src": {
				"options": {
					preserveComments: 'some'
				},
				"src": "jquery.ba-throttle-debounce.js",
				"dest": "jquery.ba-throttle-debounce.min.js"
			}
		}
	});

	grunt.registerTask("build", ["jshint:src", "qunit:src", "uglify:src"]);
	grunt.registerTask("test", ["qunit"]);

};
