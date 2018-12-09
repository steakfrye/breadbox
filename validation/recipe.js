const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.flouramount = !isEmpty(data.flouramount) ? data.flouramount : '';
  data.yeastamount = !isEmpty(data.yeastamount) ? data.yeastamount : '';
  data.water = !isEmpty(data.water) ? data.water : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required.';
  }

  if (Validator.isEmpty(data.flouramount)) {
    errors.flouramount = 'Flour amount is required.';
  }

  if (Validator.isEmpty(data.water)) {
    errors.water = 'Water amount is required.';
  }

  if (Validator.isEmpty(data.yeastamount)) {
    errors.yeastamount = 'Yeast amount is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
