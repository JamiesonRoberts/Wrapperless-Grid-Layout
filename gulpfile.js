// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Default Task
gulp.task('init', ['lint', 'style', 'scripts', 'watch']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/**/*', ['lint', 'scripts']);
    gulp.watch('src/styles/**/*', ['style']);
    // gulp.watch('src/templates/**/*', ['template']);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('style', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/assests/styles'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/assests/scripts'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assests/scripts'));
});

// Move Templates
gulp.task('template', function() {
	return gulp.src('src/templates/**/*');
});

