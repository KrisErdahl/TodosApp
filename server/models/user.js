let mongoose = require('mongoose');

// promise.then(function(db) {
const User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

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
