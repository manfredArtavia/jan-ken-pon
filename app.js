var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Connection to DB
mongoose.connect('mongodb://manfredartavia-3242:leF8E_cr4bVxW_r-E11R@manfredartavia-3242.mongo.dbs.appsdeck.eu:30419/manfredartavia-3242', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Import Models and controllers
var models     = require('./app/models/player')(app, mongoose);
var PlayerCtrl = require('./app/controllers/players');
var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Let's Rock!!!");
});

//Home page
app.use(express.static(__dirname + "/public"));

app.use(router);

// API routes
var players = express.Router();



//save results
players.route('/result')
  .post(PlayerCtrl.saveResult);

// get the chapions top
players.route('/top')
  .get(PlayerCtrl.getTop);

// start a new championship
players.route('/new')
  .post(PlayerCtrl.newChampionship);

// clear the database
players.route('/clear')
  .delete(PlayerCtrl.clearDB);

app.use('/api/championship', players);

// Start server

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });