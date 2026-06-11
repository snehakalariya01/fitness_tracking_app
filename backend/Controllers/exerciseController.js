const Exercise = require('../model/Exercise');

// Create a new exercise (Add to the dictionary/catalog)
exports.createExercise = async (req, res) => {
  try {
    const { name, category, targetMuscle, description } = req.body;

    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({ message: "Name and Category are required" });
    }

    // Check if exercise already exists
    const existingExercise = await Exercise.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingExercise) {
      return res.status(400).json({ message: "Exercise with this name already exists" });
    }

    const exercise = new Exercise({
      name,
      category,
      targetMuscle,
      description
    });

    const savedExercise = await exercise.save();
    res.status(201).json({ message: "Exercise created successfully", exercise: savedExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating exercise", error: error.message });
  }
};

// Get all available exercises
exports.getAllExercises = async (req, res) => {
  try {
    // We can also add filtering by category here if needed in the future
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }

    const exercises = await Exercise.find(query).sort({ name: 1 }); // Sort alphabetically by name
    res.status(200).json({ exercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching exercises", error: error.message });
  }
};

// Get a single exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching exercise", error: error.message });
  }
};

// Update an exercise
exports.updateExercise = async (req, res) => {
  try {
    const { name, category, targetMuscle, description } = req.body;
    
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id, 
      { name, category, targetMuscle, description },
      { new: true, runValidators: true } // Return updated doc and run schema validation
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise updated successfully", exercise: updatedExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating exercise", error: error.message });
  }
};

// Delete an exercise
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting exercise", error: error.message });
  }
};
