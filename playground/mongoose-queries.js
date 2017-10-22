const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '59eba32e7a659e403e5501a7';

User.findById(id)
	.then(user => {
		if (!user) {
			return console.log('User not found');
		}
		console.log(JSON.stringify(user, undefined, 2));
	})
	.catch(e => console.log(e));

// const id = '59ebd8ec8b6ddf4e177671fd11';
// //added 11 at the end of an otherwise valid id
//
// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then(todos => {
// 	console.log('Todos', todos);
// });
//
// Todo.findOne({
// 	_id: id
// }).then(todo => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id)
// 	.then(todo => {
// 		if (!todo) {
// 			return console.log('ID not found');
// 		}
// 		console.log('Todo By ID', todo);
// 	})
// 	.catch(e => console.log(e));
