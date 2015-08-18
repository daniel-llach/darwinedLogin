/**
 * Load up the project dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var url = require('url'); // req.body
var jwt = require('jwt-simple');

/*
 * THe JWT middleware
 */
var jwtauth = require('./lib/jwtauth');

/*
 * Create Express app
 */
app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// view engine
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/*
 * Set the secret for encoding/decoding JWT tokens
 */
app.set('jwtTokenSecret', 'superdarwined')

/*
 * A simple middleware to restrict access to authenticated users.
 */
var requireAuth = function(req, res, next) {
  console.log(req.user);
	if (!req.user) {
		res.status(401).send('Not authorized');
	}	else {
		next()
	}
}

/*
 * Load up the controllers
 */
var controllers = require('./controllers')
controllers.set(app)

/*
 * Start listening
 */
var server = app.listen(8080, function() {
	console.log('Listening on port %d'.green, server.address().port)
});

/*
 * Protected routes
 */
 app.get('/secret', jwtauth, requireAuth, function(req, res){
	// res.send('Hola ' + req.user[0].nombre + ' ' + req.user[0].apellidos)
  res.json(req.user[0]);
})


/*
 * Unprotected routes
 */
 // login form
 app.get('/', function(req, res){
   res.status(200).send('darwined login!');
 });
