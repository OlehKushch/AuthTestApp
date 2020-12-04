const express = require("express"),
  path = require("path");

//loads MONGOLAB_URI into process.env read from file .env
require("dotenv").config();

app = express();

var todoApi = require("./routs/todos");
var auth = require("./routs/auth");
var bodyParser = require("body-parser");
var expressLayouts = require("express-ejs-layouts");
var mongoose = require("mongoose");

var userList = require('./user-list');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on("error", () => {
  console.error(
    "MongoDB Connection Error. Please make sure that MongoDB is running."
  );
//   process.exit(1);
});

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main-layout");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use("/auth", auth);
app.use("/api", todoApi);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    var user = userList.find((user) => user.name === username && user.password === password);

    if (user) {
        done(null, user);
    } else {
        done(null, false, { message: "Incorrect username or password." });
    }
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false, { message: "Incorrect username." });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: "Incorrect password." });
    //   }
    //   return done(null, user);
    // });
  })
);

const sendHTMLpage = (req, res) => {
  res.status(200).send("Server is works");
};

app.get("/", (req, res) => {
  sendHTMLpage(req, res);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Example app listening on port " + (process.env.PORT || 3000));
});

module.exports = app;
