// server.js
// where your node app starts

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

// 
app.get('/api/:date?', (req, res, next) => {
  if (req.params.date) {
    // console.log(`req.params.date`, typeof req.params.date, req.params.date); // DEBUG
    if (/^[\d]+$/.test(req.params.date)) {
      req.date = new Date(parseInt(req.params.date, 10));
    } else {
      req.date = new Date(req.params.date);
      req.dateInvalid = isNaN(req.date)
    }
  } else {
    req.date = new Date();
  }
  next();
}, (req, res) => {
  // console.log(req); // DEBUG
  res.json({
    unix: !req.dateInvalid ? req.date.getTime() : undefined,
    utc: !req.dateInvalid ? req.date.toUTCString() : undefined,
    error: req.dateInvalid ? 'Invalid Date' : undefined
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
