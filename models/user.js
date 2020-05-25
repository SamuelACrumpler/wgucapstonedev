var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	type: String,
	password: String,
	createdBy: String,
	updatedBy: String,
	updatedDate: { type: Date, default: Date.now },
	createdDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);