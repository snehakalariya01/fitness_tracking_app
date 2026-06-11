const express = require('express');
const router = express.Router();
const {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
} = require('../Controllers/exerciseController');

// POST /api/exercises - Create a new exercise in the catalog
router.post('/', createExercise);

// GET /api/exercises - Get all exercises
router.get('/', getAllExercises);

// GET /api/exercises/:id - Get a specific exercise by ID
router.get('/:id', getExerciseById);

// PUT /api/exercises/:id - Update a specific exercise
router.put('/:id', updateExercise);

// DELETE /api/exercises/:id - Delete a specific exercise
router.delete('/:id', deleteExercise);

module.exports = router;
