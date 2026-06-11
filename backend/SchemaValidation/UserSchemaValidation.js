const joi=require('joi');

const userValidation=(data)=>{
    const schema=joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        age:joi.number().required(),
        height:joi.number().required(),
        weight:joi.number().required(),
        gender:joi.string().required(),
        activityLevel:joi.string(),
        fitnessGoal:joi.string()
    });
    return schema.validate(data);
};

module.exports = userValidation;
