
module.exports = function (gulp, plugins, config) {
  var deferred = plugins.Q.defer();
  var t = {
    appCSS: config.publish[config.publish.destination].assets + '/css/app.css',
    appJS: config.publish[config.publish.destination].assets + '/js/app.js',
    imagePath: config.publish[config.publish.destination].assets + '/images',
    linkPath: config.publish[config.publish.destination].base,
    copyright: '&copy ' + new Date().getFullYear()
  };
 
  var data = {pages: {}, includes: {}, content: {}};
  var tConfig = {};
  var files = [];
  tConfig = require('../src/templates/config/templates.json');
  var includeDir = plugins.path.join(config.root, config.source.templates, tConfig.includes);
  var templateDir = plugins.path.join(config.root, config.source.templates);
  var includeList = [];
  var templateList = [];

  files = plugins.fs.readdirSync(includeDir, plugins.fs.NON_RECURSIVE);
  files.forEach(function(file) {
    path = plugins.path.join(includeDir, file);
    if (!plugins.fs.statSync(path).isDirectory()) {
      includeList.push({file: removeExtension(file), path: path});
    } 
  }); 

  files = plugins.fs.readdirSync(templateDir, plugins.fs.NON_RECURSIVE);
  files.forEach(function(file) {
    path = plugins.path.join(templateDir, file);
    if (!plugins.fs.statSync(path).isDirectory()) {
      templateList.push({file: removeExtension(file), path: path});
    } 
  }); 

  //get content from JSON file
  if(tConfig.source == 'json') {
    var tContent = require(plugins.path.join(config.root, '/src/data/content.json'));
    for(var i in tContent) {
      
      var page = tContent[i];
      data.content[i] = [];
      
      data.pages[i] = {'pageClass':page['class']}
      for(var j in page['content']) {
        var html = '';
        var tags = page['content'][j];
        for(var c in tags){

            var tagAttributes = ' ';
            if(tags[c].tag == 'a') {
              tagAttributes += ' href="'+ t.linkPath + tags[c].href + '" ';
            } else if(tags[c].tag == 'img') {
              if (!/^(f|ht)tps?:\/\//i.test(tags[c].src)) {
                var srcPath = t.imagePath + '/' + tags[c].src;
              } else {
                var srcPath = tags[c].src;
              }
              tagAttributes += ' src="'+ srcPath + '" ';
            }
            if (tags[c].class) {
              tagAttributes += ' class="'+ tags[c].class + '" ';
            }
            if (tags[c].id) {
              tagAttributes += ' id="'+ tags[c].id + '" ';
            }
            if(tags[c].tag == 'img') {
              var tag = '<' + tags[c].tag + ' ' + tagAttributes + ' alt="' + tags[c].alt + '"" />';
            } else {
              var tag = '<' + tags[c].tag + ' ' + tagAttributes + '>' + tags[c].content + '</' + tags[c].tag + '>';
            }
            html = html + tag;
        }
        data.content[i][j] = plugins._.template(html, {t: t});
      }
    }
  }
  var outputPath = plugins.path.join(config.root, config.publish[config.publish.destination].output);
  var inputPath = plugins.path.join(config.root, config.source.templates, '*.php');
  gulp.src(inputPath)
      .pipe(plugins.tap(function (file,through) {
          var f = removeExtension(plugins.path.basename(file.path));
          if (data.pages[f]) {
            t.pageClass = data.pages[f].pageClass;
          }
          //go through the includes and add page specific content
          for (var key in includeList)
          {
              (function(key) {
                var inc = includeList[key];
                if (inc.file[0] == '_') {
                  //dont parse it using underscore just  yet, JS will handle it
                  data.includes[inc.file] = plugins.fs.readFileSync(inc.path, 'utf8');
                } else {
                  t.templateName = inc.file;
                  data.includes[inc.file] = plugins._.template(plugins.fs.readFileSync(inc.path, 'utf8'), {t: t});
                }
              })(key);
          }        
          var params = {includes: data.includes, t: t, content: data.content[f]};
          var c = plugins._.template(file.contents.toString(), params);
          file.contents = new Buffer(c);
      }))
      .pipe(gulp.dest(outputPath))
      .on('end', function () {
        plugins.notifier.notify({title: 'Task Complete', message: 'Templates task complete!'});
        deferred.resolve();
      });
      
      return deferred.promise;
};


function removeExtension(filename){
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}