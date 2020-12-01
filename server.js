// server.js
// where your node app starts
require('dotenv').config();
var moment = require('moment');
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:userTimestamp?", function(req,res){
  let response = {
    unix:'',
    utc: '',
    error: '',
  }
  const userTime = req.params.userTimestamp || new Date();
  let momentTime;
  if(/\d{5,}/.test(userTime)) {
    momentTime = moment(parseInt(userTime));
  } else {
    if(new Date(userTime).toString() === 'Invalid Date') {
      response.error = 'Invlalid Date';
      return res.json(response);
    }
    momentTime = moment(userTime);
  }
  response.unix = momentTime.unix()*1000;
  momentTime.utc();
  response.utc = momentTime.toString();
  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
