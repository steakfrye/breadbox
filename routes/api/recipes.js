const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile'); // Profile model
const Recipe = require('../../models/Recipe'); // Model
const validateRecipeInput = require('../../validation/recipe'); // Validation

// @route    GET /api/recipes
// @dscrp    Display all recipes
// @access   Public
router.get('/', (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found.' }));
});

// @route    GET /api/recipes/:id
// @dscrp    Display individual recipe
// @access   Public
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ norecipefound: 'No recipe found.' }));
});


// @route    POST /api/recipes
// @dscrp    Create recipe
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newRecipe =  new Recipe({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newRecipe.save().then(recipe => res.json(recipe));
});

// @route    POST /api/recipes/like/:id
// @dscrp    Like recipe
// @access   Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          // Make sure user only likes once
          if(recipe.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this recipe.' });
          } else {
            // Add user id to likes array
            recipe.likes.unshift({ user: req.user.id });
            recipe.save().then(recipe => res.json(recipe));
          }
        })
        .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found.' })
    );
  });
});

// @route    DELETE /api/recipes/unlike/:id
// @dscrp    Remove like
// @access   Private
router.delete('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          // Make sure user only likes once
          if(recipe.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not liked this recipe.' });
          } else {

            // Get remove index
            const removeIndex = recipe.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            // Splice out of array
            recipe.likes.splice(removeIndex, 1);
            recipe.save().then(recipe => res.json(recipe));
          }
        })
        .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found.' })
    );
  });
});

// @route    POST /api/recipes/comment/:id
// @dscrp    Add comment to recipe
// @access   Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  if(!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {

          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
          };
          // Add user id to comments array
          recipe.comments.unshift(newComment);
          recipe.save().then(recipe => res.json(recipe));
        })
        .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found.' })
    );
  });
});

// @route    DELETE /api/recipes/comment/:id/:comment_id
// @dscrp    Remove comment
// @access   Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        // Make sure user only comments once
        if(recipe.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(400).json({ notcommented: 'You have not commented this recipe.' });
        } else {

          // Get remove index
          const removeIndex = recipe.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          // Splice out of array
          recipe.comments.splice(removeIndex, 1);
          recipe.save().then(recipe => res.json(recipe));
        }
      })
      .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found.' })
  );
});


// @route    DELETE /api/recipes/:id
// @dscrp    Delete recipe
// @access   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          // Check for recipe user
          if(recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized.'});
          }

          recipe.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found.' })
    );
  });
});

module.exports = router;
