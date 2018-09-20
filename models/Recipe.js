const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const RecipeSchema = new Schema({
  temperature: {
    type: Number,
  },
  fdt: {
    type: Number,
  },
  flour: {
    type: String,
    amount: {
      type: Number,
      required: true,
    },
    required: true,
  },
  water: {
    type: Number,
    required: true,
  },
  salt: {
    type: Number,
    default: 2,
  },
  addition: {
    type: String,
    amount: {
      type: Number,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('recipes', UserSchema);
