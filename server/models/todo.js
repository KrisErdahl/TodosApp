let mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// promise.then(function(db) {
const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// 	const newTodo = new Todo({
// 		text: '   Sauna!   '
// 	});
//
// 	newTodo
// 		.save()
// 		.then(doc => {
// 			console.log(JSON.stringify(doc, undefined, 2));
// 		})
// 		.catch(err => {
// 			console.error('Unable to save this todo', err.stack);
// 			process.exit(1);
// 		});
// });

module.exports = { Todo };
