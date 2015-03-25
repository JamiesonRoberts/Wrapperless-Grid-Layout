
module.exports = function (gulp, plugins, config) {
    plugins.watch(['./src/scripts/**/*'], function() {
     config.gulp.tasks['scripts'](gulp, plugins, config);
    });  
    plugins.watch(['./src/images/icons/*'], function() {
      config.gulp.tasks['icons'](gulp, plugins, config);
    });  
    plugins.watch(['./src/images/**/*'], function() {
      config.gulp.tasks['images'](gulp, plugins, config);
    });  
    plugins.watch(['./src/fonts/**/*'], function() {
      config.gulp.tasks['fonts'](gulp, plugins, config);
    });  
    plugins.watch(['./src/styles/**/*'], function() {
      config.gulp.tasks['styles'](gulp, plugins, config);
    });
    plugins.watch(['./src/templates/**/*'], function() {
      config.gulp.tasks['templates'](gulp, plugins, config);
    });
    plugins.watch(['./src/data/content.json'], function() {
      config.gulp.tasks['templates'](gulp, plugins, config);
    });
};
