const Challenge = require('../model/Challenge');
const User = require('../model/User');

// Create a new challenge (Personal Goal)
exports.createChallenge = async (req, res) => {
  try {
    const { userId, title, description, goalType, goalTarget, startDate, endDate } = req.body;

    if (!userId || !title || !goalType || !goalTarget || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const challenge = new Challenge({
      userId,
      title,
      description,
      goalType,
      goalTarget,
      startDate,
      endDate
    });

    const savedChallenge = await challenge.save();
    res.status(201).json({ message: "Challenge created successfully", challenge: savedChallenge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating challenge", error: error.message });
  }
};

// Get challenges (all or filtered by user)
exports.getAllChallenges = async (req, res) => {
  try {
    const { userId } = req.query; // Optional: ?userId=123
    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const challenges = await Challenge.find(query)
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ challenges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching challenges", error: error.message });
  }
};

// Get a specific challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('userId', 'username profilePicture stats');

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ challenge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching challenge", error: error.message });
  }
};

// Update the user's progress for their challenge
exports.updateProgress = async (req, res) => {
  try {
    const { additionalProgress } = req.body;
    const challengeId = req.params.id;

    if (additionalProgress === undefined) {
      return res.status(400).json({ message: "Additional progress amount is required" });
    }

    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Update progress
    challenge.currentProgress += additionalProgress;

    // Check if goal is reached
    if (challenge.currentProgress >= challenge.goalTarget && !challenge.completed) {
      challenge.completed = true;
      
      // Reward the user in their own stats
      await User.findByIdAndUpdate(challenge.userId, {
        $inc: { 'stats.totalChallengeWins': 1 }
      });
    }

    await challenge.save();

    res.status(200).json({ 
      message: "Progress updated successfully", 
      challenge 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating progress", error: error.message });
  }
};

// Delete a challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.status(200).json({ message: "Challenge deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting challenge", error: error.message });
  }
};
