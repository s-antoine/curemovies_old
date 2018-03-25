var express = require('express');
var path = require('path');
var logger = require('morgan'); // Morgan is a logger 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //req.body.
var cors = require('cors');
var passport = require('passport');
var fs = require('fs');

require('./api/models/db');

require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder

app.use(passport.initialize());

app.use('/api', routesApi); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )


// error handlers
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if(err.name == 'UnauthorizedError') {
		res.status(401);
		res.json({"message" : err.name + ": " + err.message});
	}
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;