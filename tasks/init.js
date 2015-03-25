
module.exports = function (gulp, plugins, config) {
  config.gulp.tasks['scripts'](gulp, plugins, config);
  config.gulp.tasks['images'](gulp, plugins, config);
  config.gulp.tasks['fonts'](gulp, plugins, config);
  config.gulp.tasks['icons'](gulp, plugins, config);
  config.gulp.tasks['styles'](gulp, plugins, config);
  config.gulp.tasks['templates'](gulp, plugins, config);
};
