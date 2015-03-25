var data = {
	'common': {
		'prompts': [
			{
				name: 'serverBase',
				default: '/',
				message: 'Base path? - localhost/mysite = /mysite OR mysite.local = /'
			}
		]
	},
	'local': {
	},
	'dev': {
		'prompts': [
			{
				name: 'hostName',
				message: 'What is the hostname?'
			}
			,{
				name: 'hostUser',
				message: 'What is the user name?'
			}
			,{
				name: 'hostPass',
				message: 'What is the password?'
			}
			,{
				name: 'hostPath',
				message: 'What is the path?'
			}
		]		
	},
	'live': {
		'prompts': [
			{
				name: 'hostName',
				message: 'What is the hostname?'
			}
			,{
				name: 'hostUser',
				message: 'What is the user name?'
			}
			,{
				name: 'hostPass',
				message: 'What is the password?'
			}
			,{
				name: 'hostPath',
				message: 'What is the path?'
			}
		]		
	}

};
module.exports = function (gulp, plugins, config) {
	var stage = config.env.stage || 'local';
	var common = data['common'].prompts;
	var prompts = common.concat(data[stage].prompts); 
	gulp.src('config.json')
	.pipe(plugins.prompt.prompt(prompts, function(res){
	    if(res.serverBase == '/') {
	    	config.publish[stage].base = res.serverBase;
	    	config.publish[stage].assets = '/assets';
	    } else {
	    	config.publish[stage].base = '/' + res.serverBase + '/public';
	    	config.publish[stage].assets = config.publish[stage].base + '/assets';
	    }	    
		if(res.hostName){config.publish[stage].connect.host = res.hostName;}
		if(res.hostUser){config.publish[stage].connect.user = res.hostUser;}
		if(res.hostPass){config.publish[stage].connect.pass = res.hostPass;}
		if(res.hostPath){config.publish[stage].connect.path = res.hostPath;}
		var cf = plugins.path.join(config.root, 'config.json');
		plugins.fs.writeFile(cf, JSON.stringify(config, null, 4));
	}));
 
};

