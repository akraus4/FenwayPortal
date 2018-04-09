var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var cors = require('cors')
// Initialize Express App
var app = express();

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

app.get('/products/:id', function (req, res, next) {
	res.json({msg: 'This is CORS-enabled for all origins!'})
  })

// Set Static Path
// app.use('/', express.static(__dirname));

// Import API Routes
app.use(require('./api/user_api'));

port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("listening to port " + port);
})

