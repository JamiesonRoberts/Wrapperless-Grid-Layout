
module.exports = function (gulp, plugins, config) {
    var deferred = plugins.Q.defer();
    var src = plugins.path.join(config.root + '/' + config.source.styles);
    
    plugins.sass(src,{
       style: 'compact',
       loadPath: ['bower_components', 'node_modules']
    }) 
    .pipe(plugins.cached())
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.minifycss())    
    .pipe(plugins.remember())
    .pipe(gulp.dest(config.ap + '/css/'))
    .on('end', function () {
        plugins.notifier.notify({title: 'Task Complete', message: 'Styles task complete!'});
        deferred.resolve();
    });
    return deferred.promise;
};
