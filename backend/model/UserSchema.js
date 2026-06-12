const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    gender:{type:String,required:true},
    activityLevel:{type:String},
    fitnessGoal:{type:String},
    stats: {
        totalWorkouts: { type: Number, default: 0 },
        totalCaloriesBurned: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        totalChallengeWins: { type: Number, default: 0 },
    }
})

const User=mongoose.model('User',userSchema);

module.exports=User;