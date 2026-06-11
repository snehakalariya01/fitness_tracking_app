const User = require('../model/UserSchema');
const mongoose = require('mongoose');
const userValidation = require('../SchemaValidation/UserSchemaValidation');

const addUser = async (req, res) => {
    try {
        // Validate the input data using Joi
        const { error } = userValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, email, age, height, weight, gender, activityLevel, fitnessGoal } = req.body;
        
        const newUser = new User({
            name,
            email,  
            age,
            height,
            weight,
            gender
        });

        if (activityLevel) {
            newUser.activityLevel = activityLevel;
        }
        if (fitnessGoal) {
            newUser.fitnessGoal = fitnessGoal;
        }

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const { name, email, age, height, weight, gender, activityLevel, fitnessGoal } = req.body;

        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (age) updatedData.age = age;
        if (height) updatedData.height = height;
        if (weight) updatedData.weight = weight;
        if (gender) updatedData.gender = gender;
        if (activityLevel) updatedData.activityLevel = activityLevel;
        if (fitnessGoal) updatedData.fitnessGoal = fitnessGoal;     

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true , runValidators: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}


const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
};

    