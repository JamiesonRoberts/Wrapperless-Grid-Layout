'use strict';

var gulp     = require('gulp');
var requireDir = require('require-dir');
var plugins  = require('./ourcane.js')(gulp,{config:'./package.json', replaceString: [/^gulp(-|\.)/, /^node(-|\.)/, /^vinyl(-|\.)/], scope: ['dependencies'], rename: {'vinyl-source-stream':'source', 'gulp-ruby-sass':'sass', 'q':'Q', 'gulp-minify-css': 'minifycss', 'underscore-node':'_'}});
var config = require('./config.json');

plugins.fs = require('fs');
plugins.path = require('path');

config.root = plugins.path.normalize(__dirname);
config.env = plugins.util.env;
config.gulp.tasks = requireDir(config.gulp.taskDir);

config.ap = plugins.path.join(config.root, config.publish[config.publish.destination].output, 'assets');

for (var key in config.gulp.tasks)
{
    (function(key) {
	   gulp.task(key, function() {
	       return config.gulp.tasks[key](gulp, plugins, config);
	   });
    })(key);
}
