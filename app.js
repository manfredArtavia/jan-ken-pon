var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/player')(app, mongoose);
var PlayerCtrl = require('./controllers/players');
var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Let's Rock!!!");
});

app.use(router);

// API routes
var players = express.Router();

players.route('/result')
  .post(PlayerCtrl.saveResult);

players.route('/top')
  .get(PlayerCtrl.getTop);

app.use('/api/championship', players);
mongoose.connect('mongodb://localhost/players', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

// Start server
/*
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });*/