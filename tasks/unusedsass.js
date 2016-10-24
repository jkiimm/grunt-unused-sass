/*
 * grunt-unused-sass
 * https://github.com/ligeek/grunt-unused-sass
 *
 * Copyright (c) 2016 Jinyoung Kim
 * Licensed under the MIT license.
 */

'use strict';

var purify = require('purify-css');
var fs = require('fs');
var sourceMap = require('source-map');
var lineColumn = require('line-column');

module.exports = function(grunt) {
  grunt.registerMultiTask('unusedsass', 'Find position of unused selectors in sass file', function() {
    var done = this.async();
    var selectors = purify(this.data.src, [this.data.css]).rejected;

    fs.readFile(this.data.sourcemap, 'utf8', function (err, text) {
      if (err) { grunt.fail.warn(err); }
      var smc = new sourceMap.SourceMapConsumer(JSON.parse(text));

      fs.readFile(this.data.css, 'utf8', function (err, css) {
        if (err) { grunt.fail.warn(err); }
        grunt.log.writeln('unused sass selectors position:'); 
        selectors.forEach(function (selector) {
          var csspos = lineColumn(css).fromIndex(css.indexOf(selector));
          var sasspos = smc.originalPositionFor({ line: csspos.line, column: csspos.col });
          var pos = { line: sasspos.line, column: sasspos.column };
          grunt.log.writeln('-------------------------------------------'); 
          grunt.log.writeln('file: ', sasspos.source); 
          grunt.log.writeln('selector: ', selector); 
          grunt.log.writeln('position: ', pos); 
          done();
        });
        grunt.log.writeln('-------------------------------------------'); 
      });
    }.bind(this));
  });
};
