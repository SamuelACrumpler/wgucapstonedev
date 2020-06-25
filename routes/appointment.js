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

/* Get appointments by the date*/
router.get('/d/:year/:month/:day', async function (req, res, next) {
	console.log(req.params.year + ' ' + req.params.month + ' ' + req.params.day)
	dss = req.params.year + '-' + req.params.month + '-' + req.params.day + ' 00:00'
	//dse = req.params.year + '-' + req.params.month + '-' + req.params.day + ' 23:59' 
	dts = new Date(dss);
	////dte = new Date(dse);
	//console.log(dts)
	//console.log(dte)
	//console.log('................................................')
	let d = new Date();
	d.setFullYear(req.params.year, req.params.month, req.params.day)
	d.setHours(0); d.setMinutes(0)
	//const stime = new Date(this.state.date + " " + this.state.stime);
	//d.setMonth(req.params.month)
	//d.setDate(req.params.day)
	var date222 = new Date('6/1/2020 12:00:00 AM UTC');
	var date223 = new Date('6/30/2020 11:59:59 PM UTC');
	d.setHours(0);
	let d2 = d;
	d2.setDate(parseInt(req.params.day)+2);
	console.log(d);
	console.log(d.toISOString());
	console.log(d2);
	console.log(date222)
	console.log(date223)

	//{"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})

	Appointment.find({ stime: {"$gte": dts.toISOString(), "$lt": d2.toISOString()} }, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.get('/m/:year/:month/:day', async function (req, res, next) {
	console.log('--------------------------------------------------')
	console.log(req.params.year + ' ' + req.params.month)
	let dss = req.params.year + '-' + req.params.month + '-' + req.params.day + ' 00:00' //sets the date for the first day
	let dts = new Date(dss); //create the date
	
	
	let d2 = new Date(dts.getFullYear(),dts.getMonth(), 0).getDate(); //Should get the number of days in the month
	let dse = req.params.year + '-' + req.params.month + '-' + d2 + ' 23:59' //Set the final day and the last hour
	
	let dte = new Date(dse);

	dte.setDate(d2)
	dts.setDate(1);
	
  	console.log(dts)
	console.log(dts.toISOString());
	

	console.log(dte)
	console.log(dte.toISOString());

	let d = new Date();
	d.setFullYear(req.params.year, req.params.month, req.params.day)
	//const stime = new Date(this.state.date + " " + this.state.stime);
	//d.setMonth(req.params.month)
	//d.setDate(req.params.day)
	d.setHours(0);
	d2 = d;
	d2.setDate(req.params.day+1);
	console.log(d);
	//{"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})

	Appointment.find({ stime: {"$gte": dte.toISOString(), "$lt": d2.toISOString()} }, function (err, post) {
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