var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = require('../models/customer.js');

/* Get all users in the database. Products contains all results found */
router.get('/', function (req, res, next) {
	console.log("This was tried");

	Customer.find(function (err, products) {
		if (err) return next(err);
		res.json(products);
	});
});

router.get('/count', function (req, res, next) {
	console.log("Running Count");

	//User.count(function (err, products) {
	//	if (err) return next(err);
	//	res.json(products);
	//});

	User.estimatedDocumentCount(function (err, count) {
		if (err) return next(err);
		res.json(count);
	});


});


/* Get user by id*/
router.get('/:id', function (req, res, next) {
	console.log("This was tried");
	Customer.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Get user by id*/
router.get('/u/:username', async function (req, res, next) {

	Customer.findOne({ username: req.params.username }, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Save entry into database */
router.post('/', function (req, res, next) {
	Customer.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Update entry in the database */
router.put('/:id', function (req, res, next) {
	Customer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Delete entry in database */
router.delete('/:id', function (req, res, next) {
	Customer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Delete the collection in database */
router.delete('/d/', function (req, res, next) {
	Customer.collection.drop();
});


module.exports = router;