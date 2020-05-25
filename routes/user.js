var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

/* Get all users in the database. Products contains all results found */
router.get('/', function (req, res, next) {
	console.log("This was tried");

	User.find(function (err, products) {
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

router.get('/test', function (req, res, next) {
	console.log("Running Count");

	User.collection.drop();
	res.json("it worked");

});

/* Get user by id*/
router.get('/:id', function (req, res, next) {
	console.log("This was tried");
	User.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Get user by id*/
router.get('/u/:username', async function (req, res, next) {

	User.findOne({ username: req.params.username }, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Save entry into database */
router.post('/', function (req, res, next) {
	console.log("save attempted")

	User.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Update entry in the database */
router.put('/:id', function (req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Delete entry in database */
router.delete('/:id', function (req, res, next) {
	User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});


/* Delete entry in database */
router.get('/d/:id', function (req, res, next) {
	User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});



module.exports = router;