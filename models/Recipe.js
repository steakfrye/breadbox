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
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  }, ],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }, ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Recipe = mongoose.model('recipes', RecipeSchema);
