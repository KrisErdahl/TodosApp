require('./config/config');

// function connectDatabase(databaseUri){
//     var promise = mongoose.connect('mongodb://localhost/myapp', {
//         useMongoClient: true,
//     });
//     return promise;
// }

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo
		.save()
		.then(doc => {
			res.send(doc);
		})
		.catch(err => {
			res.status(400).send(err);
			// process.exit(1);
		});
});

app.get('/todos', (req, res) => {
	Todo.find()
		.then(todos => {
			res.send({ todos });
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

// app.get('/todos/:id', (req, res) => {
// 	res.send(req.params);
// });

// GET / todos / id;
app.get('/todos/:id', (req, res) => {
	// const id = '59ebd8ec8b6ddf4e177671fd';
	let id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findById(id)
		.then(todo => {
			if (!todo) {
				res.status(404).send();
			} else {
				return res.send({ todo });
			}
		})
		.catch(err => {
			res.status(400).send();
		});
});

//DELETE /todos/id
app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(err => {
			res.status(400).send();
		});
});

//UPDATE with PATCH
app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	//_.pick restricts items user is allowed to update
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	// if completed is a Boolean and it is set to true(body.completed), then continue
	if (_.isBoolean(body.completed) && body.completed) {
		// .getTime returns milliseconds from 1/1/1970, JS time stamp from Unix Epic
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	// similar to findOneAndUpdate used earlier
	// enter object and MongoDB operators to set the new values
	Todo.findByIdAndUpdate(
		id,
		{
			$set: body
		},
		// similar to returnOriginal, but for Mongoose
		{ new: true }
	)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(err => {
			res.status(400).send();
		});
});

app.listen(port, () => {
	console.log(`started up at port ${port}`);
});

module.exports = { app };
