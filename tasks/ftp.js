
module.exports = function (gulp, plugins, config) {
	var deferred = plugins.Q.defer();
	
	if (/dev|live/.test(config.publish.destination)){
		gulp.src(config.root + '/tmp/build/**/*')
		.pipe(plugins.ftp({
		    host: config.publish[config.publish.destination].connect.host,
		    user: config.publish[config.publish.destination].connect.user,
		    pass: config.publish[config.publish.destination].connect.pass,
		    remotePath: config.publish[config.publish.destination].connect.path
		}))
		.pipe(plugins.util.noop())	
		.on('data', function(v) {
	  		var f = v.relative;
			deferred.notify(f);
		})
		.on('end', function () {
			plugins.notifier.notify({title: 'Task Complete', message: 'FTP task complete!'});
			deferred.resolve();
		});
		return deferred.promise;
	} else {
		return deferred.resolve();
	}

};

