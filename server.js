//import modules
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const app = express();

// Implement helmet
app.use(helmet());

// Body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes
const profile = require('./routes/api/profile');
const recipes = require('./routes/api/recipes');
const users = require('./routes/api/users');

// DB config
const db = require('./config/keys').mongoURI;

// Connect DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

// Use routes
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);
app.use('/api/users', users);

// Production server assets
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('/client/build/'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}. Database connected.`))
  .on('error', console.log);

process.on('SIGINT', () => { console.log("Closing server."); process.exit(); });
