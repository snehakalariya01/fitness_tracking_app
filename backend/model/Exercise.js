const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Strength', 'Cardio', 'Flexibility', 'Balance'],
    required: true,
  },
  targetMuscle: {
    type: String,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
