const bcrypt = require('bcryptjs');
const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load User model
const User = require('../../models/User');

//@route    POST /api/users/register
//@dscrp    registers new users
//@access   public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      errors.email = 'Email already exists.';
      return res.status(400).json(errors);
    } else {
      //define avatar
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //default
      });

      //create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      //hash and save new password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(console.log(err));
        });
      });
    }
  });
});

//@route    POST /api/users/login
//@dscrp    login user / return JWT token
//@access   public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found.';
        return res.status(404).json(errors);
      }

      //check password
      bcrypt.compare(password, user.password)

        //match user
        .then(isMatch => {
          if (isMatch) {

            const payload = { //create jwt payload
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );

          } else {
            errors.password = 'Password incorrect.';
            return res.status(400).json(errors);
          }
        });
    });
});

//@route    GET /api/users/current
//@dscrp    brings current user to their page
//@access   private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;
