const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const RecipeSchema = new Schema({
  user: {
  type: Schema.Types.ObjectId,
  ref: 'users',
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  weighedin: {
    type: String,
    required: true,
  },
  temptype: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
  },
  fdt: {
    type: Number,
  },
  flour: {
    type: String,
    required: true,
  },
  flouramount: {
    type: Number,
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
  yeast: {
    type: Boolean,
    required: true,
  },
  yeastamount: {
    type: Number,
    required: true,
  },
  addition: { //extra ingredients
    type: String,
  },
  additionamount: {
    type: Number,
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
