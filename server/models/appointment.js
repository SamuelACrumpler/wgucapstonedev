var mongoose = require('mongoose');

//removed is charged. hours will be 0 denote free of charge, 1 if one time payment, 1+ if hourly charge.


var appointmentSchema = new mongoose.Schema({
	userid: String,
	custid: String,
	title: String,
	rate: Number,
	supply: Number,
	total: Number,
	hours: Number,
	overlap: String,
	type: String,
	tasks: String,
	notes: String,
	stime: { type: Date, default: Date.now },
	etime: { type: Date, default: Date.now },
	createdBy: String,
	updatedBy: String,
	updatedDate: { type: Date, default: Date.now },
	createdDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Appointment', appointmentSchema);


/*
const uid = this.state.uid
const cuid = this.state.cuid
const title = this.state.title
const rate = this.state.rate
const hours = this.state.hours
const isHourly = this.state.isHourly
const isAllDay = this.state.isAllDay
const type = this.state.type
const description = this.state.description */