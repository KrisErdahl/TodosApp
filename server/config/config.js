const env = process.env.NODE_ENV || 'development';
// console.log('env******', env);

if (env === 'development' || env === 'test') {
	const config = require('./config.json');
	// when want to use a variable to access a property, use bracket notation
	const envConfig = config[env];

	Object.keys(envConfig).forEach(key => {
		process.env[key] = envConfig[key];
	});
}

// if (env === 'development') {
// 	process.env.PORT = 3500;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
// 	process.env.PORT = 3500;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
