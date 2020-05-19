var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userid: number,
	name: String,
	address: String,
	address2: String,
	city: String,
	zip: String,
	phone: String,
	createdBy: String,
	updatedBy: String,
	updatedDate: { type: Date, default: Date.now },
	createdDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);