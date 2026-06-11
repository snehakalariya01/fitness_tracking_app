const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getUserWorkouts,
  getWorkoutById,
  deleteWorkout
} = require('../Controllers/workoutController');

// POST /api/workouts - Create a new workout
router.post('/', createWorkout);

// GET /api/workouts/user/:userId - Get all workouts for a user
router.get('/user/:userId', getUserWorkouts);

// GET /api/workouts/:id - Get a specific workout by ID
router.get('/:id', getWorkoutById);

// DELETE /api/workouts/:id - Delete a specific workout
router.delete('/:id', deleteWorkout);

module.exports = router;
