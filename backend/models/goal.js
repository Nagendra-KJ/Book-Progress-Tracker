const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    dailyPageGoal: {
        type: Number,
        required: [true, 'dailyPageGoal is a required field'],
        validate: [
            {
                validator: Number.isInteger,
                message: 'dailyPageGoal should be an integer'
            }
        ]
    },

    weeklyPageGoal: {
        type: Number,
        required: [true, 'weeklyPageGoal is a required field'],
        validate: [
            {
                validator: Number.isInteger,
                message: 'weeklyPageGoal should be an integer'
            }
        ]
    },


    annualBookGoal: {
        type: Number,
        required: [true, 'annualBookGoal is a required field'],
        validate: [
            {
                validator: Number.isInteger,
                message: 'annualBookGoal should be an integer'
            }
        ]
    },

    date: {
        type: Date,
        required: [true, 'Date is a required field']
    }

});

const Goal = mongoose.model('goals', GoalSchema);
module.exports = Goal;