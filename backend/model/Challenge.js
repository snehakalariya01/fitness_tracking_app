const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  goalType: {
    type: String,
    enum: ['Calories', 'Workouts', 'Streak', 'WeightLifted'],
    required: true,
  },
  goalTarget: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    progress: {
      type: Number,
      default: 0,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
