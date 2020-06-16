var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Appointment = require('../models/appointment.js');

/* Get all appointments in the database. Products contains all results found */
router.get('/', function (req, res, next) {
	console.log("This was tried");

	Appointment.find(function (err, products) {
		if (err) return next(err);
		res.json(products);
	});
});

router.get('/count', function (req, res, next) {
	console.log("Running Count");

	//Appointment.count(function (err, products) {
	//	if (err) return next(err);
	//	res.json(products);
	//});

	Appointment.estimatedDocumentCount(function (err, count) {
		if (err) return next(err);
		res.json(count);
	});


});

router.get('/test', function (req, res, next) {
	console.log("Running Count");

	Appointment.collection.drop();
	res.json("it worked");

});

/* Get appointment by id*/
router.get('/:id', function (req, res, next) {
	console.log("This was tried");
	Appointment.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Get appointment by id*/
router.get('/u/:title', async function (req, res, next) {

	Appointment.findOne({ title: req.params.title }, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Save entry into database */
router.post('/', function (req, res, next) {
	console.log("save attempted")

	Appointment.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Update entry in the database */
router.put('/:id', function (req, res, next) {
	Appointment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Delete entry in database */
router.delete('/:id', function (req, res, next) {
	Appointment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});


/* Delete entry in database */
router.get('/d/:id', function (req, res, next) {
	Appointment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});



module.exports = router;