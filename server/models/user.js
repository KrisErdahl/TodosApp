const mongoose = require('mongoose');
//for custom email validator
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

	return user.save().then(() => {
		return token;
	});
};

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
