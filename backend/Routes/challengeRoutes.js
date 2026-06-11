const express = require('express');
const router = express.Router();
const {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateProgress,
  deleteChallenge
} = require('../Controllers/challengeController');

// POST /api/challenges - Create a new personal challenge
router.post('/', createChallenge);

// GET /api/challenges - Get challenges (can filter by ?userId=...)
router.get('/', getAllChallenges);

// GET /api/challenges/:id - Get a specific challenge by ID
router.get('/:id', getChallengeById);

// PUT /api/challenges/:id/progress - Update progress in a challenge
router.put('/:id/progress', updateProgress);

// DELETE /api/challenges/:id - Delete a challenge
router.delete('/:id', deleteChallenge);

module.exports = router;
