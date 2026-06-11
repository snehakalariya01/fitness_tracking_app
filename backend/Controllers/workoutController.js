const Workout = require('../model/Workout');
const User = require('../model/User');

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const { userId, name, duration, totalCalories, exercises, date } = req.body;

    // Validate required fields
    if (!userId || !name || !duration || !totalCalories) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const workout = new Workout({
      userId,
      name,
      duration,
      totalCalories,
      exercises,
      date: date || Date.now()
    });

    const savedWorkout = await workout.save();

    // Update User Stats automatically
    await User.findByIdAndUpdate(userId, {
      $inc: {
        'stats.totalWorkouts': 1,
        'stats.totalCaloriesBurned': totalCalories
      }
    });

    res.status(201).json({ message: "Workout logged successfully", workout: savedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating workout", error: error.message });
  }
};

// Get all workouts for a specific user
exports.getUserWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;

    const workouts = await Workout.find({ userId })
      .populate('exercises.exerciseId', 'name category') // Get exercise details too
      .sort({ date: -1 }); // Newest first

    res.status(200).json({ workouts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workouts", error: error.message });
  }
};

// Get a single workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('exercises.exerciseId', 'name category targetMuscle');

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workout", error: error.message });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Decrement User Stats before deleting
    await User.findByIdAndUpdate(workout.userId, {
      $inc: {
        'stats.totalWorkouts': -1,
        'stats.totalCaloriesBurned': -workout.totalCalories
      }
    });

    await Workout.findByIdAndDelete(workoutId);

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting workout", error: error.message });
  }
};
