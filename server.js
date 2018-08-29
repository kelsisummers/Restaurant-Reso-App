// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Links Up Express App to CSS Files
app.use('/public/assets', express.static(__dirname + '/app/public/assets'));
app.use('/public/assets', express.static(__dirname + '/app/public/assets/images'));

// DATA
// =============================================================
var reservations = [
  {
    customerName: "Bilbo Baggins",
    phoneNumber: "(555) 555-5555",
    customerEmail: "thering@theshire.com",
    customerID: "Bilbo"
  },
  {
    customerName: "Sansa Stark",
    phoneNumber: "(555) 555-5556",
    customerEmail: "sansa@thelonewolf.com",
    customerID: "Sansa"
  },
  {
    customerName: "Tom Riddle",
    phoneNumber: "(555) 555-5558",
    customerEmail: "dumbledoresux@heirofslytherin.com",
    customerID: "Voldemort"
  },
  {
    customerName: "Katniss Everdeen",
    phoneNumber: "(555) 555-5559",
    customerEmail: "iluvpeeta@district12.com",
    customerID: "Katniss"
  },
];

var waitList = [
  {
    customerName: "Angelica Pickles",
    phoneNumber: "(555) 555-5565",
    customerEmail: "longlivecynthia@therugrats.com",
    customerID: "Angelica"
  },
  {
    customerName: "Raven Baxter",
    phoneNumber: "(555) 555-5656",
    customerEmail: "supernaturaldiva@thefuture.com",
    customerID: "Raven"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/reserve.html"));
});

// Get all characters
app.get("/api/tables", function(req, res) {
  res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitList);
});

app.post("/api/:new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReso = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  
  console.log('this is our res or waitlist', newReso);

  if (reservations.length < 5) {
    reservations.push(newReso);
    res.json({
      reserved: true
    });
  } else {
    waitList.push(newReso);
    res.json({
      reserved: false
    })
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
