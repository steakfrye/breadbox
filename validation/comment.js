const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required.';
  }

  if(!Validator.isLength(data.text, { min: 3, max: 300 })) {
    errors.text = 'Comment must be between 3 and 300 characters;'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
