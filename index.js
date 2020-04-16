// index.js

/**
 * Required External Modules
 */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
require('pug');

// Project defined modules
const approutes = require('./src/routes');
const { User } = require('./src/models');

/**
 * App Variables
 */
const PORT = process.env.PORT || 3030;
const DB_URI = 'mongodb://localhost:27017/banja';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const MONGO_DB_URI = process.env.MONGODB_URI || DB_URI;
const app = express();
/**
 *  App Configuration
 */

/**
 * body-parser to capture that form data and convert it to JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using the favicons
app.use(favicon(path.join(__dirname, '/public/favicon/favicon.ico')));

// Use sessions forr tracking the pages
app.set('trust proxy', 1);
app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    secret: 'thesecret',
    resave: true,
    saveUninitialized: false
  })
);

// Define the template engine to use
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

// Access the public folder for css
// Access the public folder in the root directory
app.use('/static', express.static(path.join(__dirname, '/public')));

app.use('/', approutes);

mongoose.connect(MONGO_DB_URI, options, (error) => {
  if (error) throw error;
  // console.log('Successfully started the database');
});

/**
 * Server Activation
 */
app.listen(`${PORT}`, () => {
  // console.log(`Listening on PORT ${PORT}`);
});
