const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
	const token = req.header('x-auth');

	//verify gotten token, defined in user.js
	User.findByToken(token)
		.then(user => {
			if (!user) {
				//will send back 401 like e below
				return Promise.reject();
			}
			// if user exists and is found
			req.user = user;
			req.token = token;
			next();
		})
		.catch(e => {
			res.status(401).send();
		});
};

module.exports = { authenticate };
