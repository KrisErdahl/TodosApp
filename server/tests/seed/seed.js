const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
	{
		_id: userOneId,
		email: 'kris@example.com',
		password: 'userOnePass',
		tokens: [
			{
				access: 'auth',
				token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
			}
		]
	},
	{
		_id: userTwoId,
		email: 'jay@example.com',
		password: 'userTwoPass'
	}
];

const todos = [
	{
		_id: new ObjectID(),
		text: 'first test todo'
	},
	{
		_id: new ObjectID(),
		text: 'second test todo',
		completed: true,
		completedAt: 333
	}
];

const populateTodos = done => {
	Todo.remove({})
		.then(() => {
			Todo.insertMany(todos);
		})
		.then(() => {
			done();
		});
};

const populateUsers = done => {
	User.remove({})
		.then(() => {
			const userOne = new User(users[0]).save();
			const userTwo = new User(users[1]).save();
			//use save to have passwords save thru middleware for hashing
			//use Promise.all to wait until all users are saved before moving on
			return Promise.all([userOne, userTwo]);
		})
		.then(() => done());
};

module.exports = { todos, populateTodos, populateUsers, users };
