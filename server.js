//import modules
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const recipes = require('./routes/api/recipes');

//DB config
const db = require('./config/keys').mongoURI;

//connect DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}. DB set to ${db}`));
