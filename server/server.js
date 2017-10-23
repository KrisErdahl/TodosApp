let express = require('express');
let bodyParser = require('body-parser');
let { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

const port = process.env.PORT || 3500;

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

app.listen(port, () => {
	console.log(`started up at port ${port}`);
});

module.exports = { app };
