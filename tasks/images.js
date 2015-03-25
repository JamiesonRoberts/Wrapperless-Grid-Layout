
module.exports = function (gulp, plugins, config) {
	var deferred = plugins.Q.defer();

    	
	gulp.src(config.source.images + '/**.*')
		.pipe(plugins.newer(config.ap + '/images/'))
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(config.ap + '/images/'))
		.on('end', function () {
			plugins.notifier.notify({title: 'Task Complete', message: 'Images task complete!'});
			deferred.resolve();
		});
	return deferred.promise;
};
