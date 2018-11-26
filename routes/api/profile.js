const express = require('express');
const mongose = require('mongoose');
const passport = require('passport');
const router = express.Router();

//load Validation
const validateProfileInput = require('../../validation/profile');

//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET /api/profile
//@dscrp    Get current user's profile
//@access   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if (!profile) {
      errors.noProfile = 'There is no profile for this user.';
      return res.status(404).json();
    };

    res.json(profile);
  })
  .catch(err => res.status(404).json());
});

//@route    GET /api/profile/handle/:handle
//@dscrp    Get profile by handle
//@access   Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user.';
      res.status(404).json(errors);
    } else {
      res.json(profile);
    }
  })
  .catch(err => res.status(404).json(err));
});

//@route    GET /api/profile/user/:user_id
//@dscrp    Get profile by handle
//@access   Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user.';
      res.status(404).json(errors);
    } else {
      res.json(profile);
    }
  })
  .catch(err =>
    res.status(404).json({ profile: 'There is no profile for this user.' }));
});

//@route    GET /api/profile/all
//@dscrp    Get all profiles
//@access   Public
router.get('/all', (req, res) => {
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noprofile = 'There are no profiles.';
      return res.status(404).json(errors);
    } else {
      res.json(profiles);
    }
  })
  .catch(err =>
    res.status(404).json({ profile: 'There are no profiles.' }));
});

//@route    POST /api/profile
//@dscrp    Create user's profile
//@access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;

  // Skills - split into array
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));

      } else {
        // Check handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })
});

//@route    DELETE /api/profile
//@dscrp    Delete user profile
//@access   Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndDelete({ user: req.user.id })
    .then(() => {
      User.findOneAndDelete({ _id: req.user.id })
        .then(() => res.json({ success: true }))
    })
  .catch(err => res.status(404).json(err));
});

module.exports = router;
