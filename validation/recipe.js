const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.flour = !isEmpty(data.flour) ? data.flour : '';
  data.water = !isEmpty(data.water) ? data.water : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required.';
  }

  if (Validator.isEmpty(data.flour)) {
    errors.flour = 'Flour amount is required.';
  }

  if (Validator.isEmpty(data.water)) {
    errors.water = 'Water amount is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
