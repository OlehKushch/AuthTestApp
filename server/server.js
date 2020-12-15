const express = require("express"),
  path = require("path");

//loads MONGOLAB_URI into process.env read from file .env
require("dotenv").config();

app = express();

var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var todoApi = require("./routs/todos");
var auth = require("./routs/auth");

var userList = require("./user-list");

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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);

app.use(flash());
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new BasicStrategy(function (username, password, done) {
    var user = userList.find(
      (user) => user.name === username && user.password === password
    );

    if (user) {
      done(null, { name: user.name });
    } else {
      done(null, false, { message: "Incorrect username or password." });
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      var user = userList.find((user) => jwtPayload.name === user.name);
      if (!user) {
        cb({message: "user not found"})
      }
      return cb(null, user)
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser", user);
  done(null, user);
});

app.use("/auth", auth);
app.use("/api", passport.authenticate('jwt', {session: false}), todoApi);

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
