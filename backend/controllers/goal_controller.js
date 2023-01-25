const Goal = require('../models/goal');

module.exports = {

    greeting(req, res, next) {
        res.send({admiral:'Huxely', domhall:'Gleeson'});
    },

    upsertGoal(req, res, next)  {
        const options = {upsert: true, new: true};
        Goal.findOneAndUpdate({}, req.body, options)
            .then((results) => {
                console.log('Here')
                res.send(results);
            })
            .catch(next);
    }

}