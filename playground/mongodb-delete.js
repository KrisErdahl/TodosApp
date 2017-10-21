const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db
	// 	.collection('Users')
	// 	.deleteMany({ name: 'Kris Erdahl' })
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	db
		.collection('Users')
		.findOneAndDelete({ _id: new ObjectID('59ead1fd9167b8244bd6a466') })
		.then(result => {
			console.log(result);
			//could also use console.log(JSON.stringify(result, undefined, 2));
		});

	//deleteMany
	// db
	// 	.collection('Todos')
	// 	.deleteMany({ text: 'Eat lunch' })
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	//deleteOne
	// db
	// 	.collection('Todos')
	// 	.deleteOne({ text: 'Eat lunch' })
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	//findOneAndDelete
	// db
	// 	.collection('Todos')
	// 	.findOneAndDelete({ completed: false })
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	// db.close();
});
