const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt salt, then hash
bcrypt.genSalt(10, (err, salt) => {
	//generate hashing
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash);
	});
});

// bcrypt compare hash to password
const hashedPassword = '$2a$10$Cz1srorksP0IARkTKsgYS.iiAAxPa940.9zXEdJU05Af7kfmnetoO';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});

// const data = {
// 	id: 10
// };
//
// //token sent back to user when they sign up or login and be stored in token object
// const token = jwt.sign(data, '123abc');
// console.log(token);
//
// const decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

//SALT AND HASH AN OBJECT METHOD
// const message = 'I am user number 4';
// const hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// const data = {
// 	id: 4
// };
// const token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// const resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log("Data was changed.  Don't trust.");
// }
