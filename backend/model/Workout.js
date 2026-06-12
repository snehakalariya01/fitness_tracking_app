const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true, // e.g., "Morning Leg Day"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true, // Total duration in minutes
  },
  totalCalories: {
    type: Number,
    required: true,
  },
  exercises: [{
    name: { type: String, required: true },
    category: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number }, // in kg or lbs
    duration: { type: Number }, // in minutes, useful for cardio
  }]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
