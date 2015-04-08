// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// Default Task
gulp.task('init', ['lint', 'style', 'scripts', 'watch', 'template']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/**/*', ['lint', 'scripts']);
    gulp.watch('src/styles/**/*', ['style']);
    gulp.watch('src/templates/**/*', ['template']);
});

// Do a publish of all files preping for deployment
gulp.task('publish', ['lint', 'style', 'styleCompressed', 'legacyjs', 'scripts', 'template']);

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/scripts/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('style', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/assests/styles'));
});

// Compile Our Sass Compressed
gulp.task('styleCompressed', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('public/assests/styles'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/app.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/assests/scripts'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assests/scripts'));
});

gulp.task('legacyjs', function() {
	return gulp.src('src/scripts/legacy.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/assests/scripts'));
});

// Move Templates
gulp.task('template', function() {
	return gulp.src('src/templates/**/*')
		.pipe(gulp.dest('public'));
});

