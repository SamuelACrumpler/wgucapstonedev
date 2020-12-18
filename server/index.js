const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');
const path = require('path');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.Promise = require('bluebird');
dotenv.config();

console.log(process.env.MDBP);
mongoose.connect('mongodb+srv://scrump:'+process.env.MDBP+'@cluster0.gmugj.mongodb.net/wgucapstone?retryWrites=true&w=majority', {promiseLibrary: require('bluebird') })
	.then(() => console.log('connection successful'+process.env.NODE_ENV + " PORT" + process.env.PORT))
	.catch((err) => console.error(err));


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



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	//res.render('error');
// 	res.json({ error: err })
// });

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });

port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', function(err) {
	console.log("Started listening on %s", app.url);
  });

console.log('App is listening on port ' + port);