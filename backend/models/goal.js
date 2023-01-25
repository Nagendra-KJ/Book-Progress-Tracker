const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    dailyPageGoal: {
        type: Number,
        required: [true, 'dailyPageGoal is a required field'],
        validate: [
            {
                validator: dailyPageGoal => dailyPageGoal > 0,
                message: 'Daily Page Goal has to be larger than 0'
            },
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
                validator: weeklyPageGoal => weeklyPageGoal > 0,
                message: 'Weekly Page Goal has to be larger than 0'
            },
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
                validator: annualBookGoal => annualBookGoal > 0,
                message: 'Annul Book Goal has to be larger than 0'
            },
            {
                validator: Number.isInteger,
                message: 'annualBookGoal should be an integer'
            }
        ]
    }

});

const Goal = mongoose.model('goals', GoalSchema);
module.exports = Goal;