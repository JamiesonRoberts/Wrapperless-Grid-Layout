
module.exports = function (gulp, plugins, config) {
	var deferred = plugins.Q.defer();

	gulp.src([config.source.fonts + '/**.*', 'bower_components/font-awesome/fonts/fontawesome-webfont.*'])
	.pipe(gulp.dest(config.ap + '/fonts/'))
	.on('end', function () {
		plugins.notifier.notify({title: 'Task Complete', message: 'Fonts task complete!'});
		deferred.resolve();
    });

    return deferred.promise;
	
};
