module.exports = function (gulp, config) {
	var package = require(config.config);
	var plugins = {};
	for (var p in package[config.scope]) {
		name = p;
		//find out if we are renaming a plugin first
		for(rem in config.rename) {
			if(name == rem){name = config.rename[rem];}
		}

		//check if we are replacing parts of a name
		for (r in config.replaceString) {
			name = name.replace(config.replaceString[r],'');	
		}
		//lets try to load the plugin
		try {
			plugins[name] = require(p);
		} catch(e) {
			
		}
	}
	return plugins;
};
