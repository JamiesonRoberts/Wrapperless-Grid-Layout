module.exports = function (gulp, plugins, config) {
	var deferred = plugins.Q.defer();
	gulp.src(config.source.images + '/favicons/**.*')
	.pipe(gulp.dest(config.ap + '/images/favicons'))
	.on('end', function () {
		plugins.notifier.notify({title: 'Task Complete', message: 'Favicons task complete!'});
		deferred.resolve();
    });
    return deferred.promise;
};
