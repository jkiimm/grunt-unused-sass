/*
 * grunt-unused-sass
 * https://github.com/ligeek/grunt-unused-sass
 *
 * Copyright (c) 2016 Jinyoung Kim
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/fixtures/main.css']
    },

    // Configuration to be run (and then tested).
    unusedsass: {
      dist: {
        src: [
          'test/fixtures/index.html',
          'test/fixtures/app.js'
        ], 
        css: 'test/fixtures/main.css',
        sourcemap: 'test/fixtures/main.css.map'
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: { 'test/fixtures/main.css': 'test/fixtures/stylesheets/main.scss' }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['sass', 'unusedsass']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
