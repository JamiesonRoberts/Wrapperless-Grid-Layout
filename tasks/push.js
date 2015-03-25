
module.exports = function (gulp, plugins, config) {

	config.publish.destination = config.env.stage || 'local';

	config.ap = plugins.path.join(config.root, config.publish[config.publish.destination].output, 'assets');

	config.gulp.tasks['fonts'](gulp, plugins, config).then(function () {
		config.gulp.tasks['images'](gulp, plugins, config).then(function () {
			config.gulp.tasks['scripts'](gulp, plugins, config).then(function () {
				config.gulp.tasks['styles'](gulp, plugins, config).then(function () {
					config.gulp.tasks['templates'](gulp, plugins, config).then(function () {
						config.gulp.tasks['ftp'](gulp, plugins, config).then(function () {
						});
					});
				});
			});
		});
	});
};

