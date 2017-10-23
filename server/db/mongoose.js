let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect to MongoDB on localhost:27017
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

module.exports = {
	mongoose
};
