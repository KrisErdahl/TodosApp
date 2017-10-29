const mongoose = require('mongoose');
//for custom email validator
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate:
			// validator.isEmail
			{
				validator: value => {
					return validator.isEmail(value);
				},
				message: '{VALUE} is not a valid email'
			}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

// override method, to handle hiding the non email and id keys from the client
UserSchema.methods.toJSON = function() {
	const user = this;
	// mongoose variable converted to a regular object where only the properties available on the document exist
	const userObject = user.toObject();
	//need to load lodash to use _pick
	return _.pick(userObject, ['_id', 'email']);
};

// use old function style because need to bind this. Arrow functions will not bind this keyword.
UserSchema.methods.generateAuthToken = function() {
	//makes it more clear who 'this' is
	const user = this;
	const access = 'auth';
	const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
	user.tokens.push({
		access: access,
		token: token
	});
	// instance methods are called with lowercase, individual document
	return user.save().then(() => {
		return token;
	});
};

//instance method to remove a token from a logged in user
UserSchema.methods.removeToken = function(token) {
	const user = this;

	return user.update({
		$pull: {
			tokens: {
				token: token
			}
		}
	});
};

UserSchema.statics.findByToken = function(token) {
	//model methods are called with an uppercase, the model
	const User = this;
	let decoded;
	//try/catch block. Any errors caught in try sends to catch error block, then continues on with function unless returned
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		// query nested by wrapping in quotes
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function(email, password) {
	const User = this;

	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}
		//bcrypt only supports callbacks, not Promises - so return new Promise instead
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

//before saving user, salt and hash the password
UserSchema.pre('save', function(next) {
	let user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			//generate hashing
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// promise.then(function(db) {
const User = mongoose.model('User', UserSchema);

// const newUser = new User({
// 	email: '   example@email.com   '
// });
//
// newUser
// 	.save()
// 	.then(doc => {
// 		console.log(JSON.stringify(doc, undefined, 2));
// 	})
// 	.catch(err => {
// 		console.error('Unable to save', err.stack);
// 		process.exit(1);
// 	});
// });

module.exports = { User };
