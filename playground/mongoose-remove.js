const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(res => {
// 	console.log(res);
// });

// Todo.findOneAndRemove({ _id: '59ed34dda8a8311a0dcd3b29' }).then(todo => {
// 	console.log(todo);
// });

Todo.findByIdAndRemove('59ed34dda8a8311a0dcd3b29').then(todo => {
	console.log(todo);
});
