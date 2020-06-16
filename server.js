const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');
const path = require('path');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb+srv://scrump:8855df1fb2@cluster0-gmugj.mongodb.net/test?retryWrites=true&w=majority', {promiseLibrary: require('bluebird') })
	.then(() => console.log('connection succesful'))
	.catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, 'src')));

var user = require("./routes/user");
var customer = require("./routes/customer");
var appointment = require("./routes/appointment");



app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

app.use("/user", user);
app.use("/customer", customer);
app.use("/appointment", appointment);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	//res.render('error');
	res.json({ error: err })
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);