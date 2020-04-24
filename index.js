require('dotenv').config()
const express = require("express");
var session = require("express-session");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
console.log('process.env.CLIENT_ID',process.env.CLIENT_ID)
console.log('process.env.CLIENT_SECRET',process.env.CLIENT_SECRET)
// Mongoose Set-Up
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useFindAndModify", false);


// *****************************************************************************************
 require('./models/allModels.js');

/*
const { Schema } = mongoose;
var findOrCreate = require("mongoose-findorcreate");
const taskSchema = new Schema({
  task: {
    type: String,
    required: "Name cannot be blank!",
    unique: true,
  },
  board: {
    type: String,
    required: "Name cannot be blank!",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  comments: {
    type: [
      {
        name: String,
        photo: String,
        comment: String,
        date: String,
      },
    ],
    default: [],
  },
});

const boardSchema = new Schema({
  board: {
    type: String,
    required: "Board cannot be blank!",
    unique: true,
  },
});

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

userSchema.plugin(findOrCreate);

mongoose.model("users", userSchema);
mongoose.model("tasks", taskSchema);
mongoose.model("boards", boardSchema);
*/

// *****************************************************************************************
console.log('Passed require')
const User = mongoose.model("users", userSchema);
// const User = mongoose.model("users");

// O-Auth
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// Initialize Express
const app = express();

// Express-session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Enable req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load static files from /dist folder
app.use("/dist", express.static(__dirname + "/dist"));
app.use(passport.initialize());

var sha256 = require("js-sha256");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://polar-everglades-20683.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Profile", profile);
      User.findOrCreate(
        {
          googleId: sha256(profile.id),
          name: profile.name.givenName,
          photo: profile.photos[0].value,
        },
        function (err, user) {
          console.log("User Entry in mongoDB", user);
          return done(null, user);
        }
      );
    }
  )
);

// Setting and getting 'cookie'
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Initialise route with express
require("./routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
