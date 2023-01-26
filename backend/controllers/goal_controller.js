const Goal = require('../models/goal');

module.exports = {

    greeting(req, res, next) {
        res.send({admiral:'Huxely', domhall:'Gleeson'});
    },

    upsertGoal(req, res, next)  {
        const options = {upsert: true, new: true};
        const newGoal = {}

        newGoal.dailyPageGoal = req.body.dailyPageGoal;
        newGoal.weeklyPageGoal = req.body.weeklyPageGoal;
        newGoal.annualBookGoal = req.body.annualBookGoal;
        newGoal.date = req.body.date;
        Goal.findOneAndUpdate({date:{
            $gte: req.body.startDate,
            $lt: req.body.endDate  
        }}, newGoal, options)
            .then((results) => {
                res.send(results);
            })
            .catch(next);
    },

    findGoal(req, res, next) {
        Goal.findOne({date:{
            $gte: req.body.startDate,
            $lt: req.body.endDate
        }})
            .then(result => res.send(result))
            .catch(next);
    }

}