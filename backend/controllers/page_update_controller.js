const PageUpdate = require('../models/pageUpdate');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'grevious'});
    },

    create(req, res, next)  {
        const PageUpdateProps = req.body;
        PageUpdate.create(PageUpdateProps)
                .then((PageUpdate) => res.send(PageUpdate))
                .catch(next);
    },

    fetchPageCount(req, res, next)  {
        PageUpdate.aggregate([
                { $match: { date: {$gte: new Date(req.body.startDate), $lt: new Date(req.body.endDate)} }},
                { $group: { _id: null, pagesCompleted: {$sum: "$pagesCompleted"}}}
                ])
                .then(result => {
                    res.send(result);
                })
                .catch(next);
    },

    fetchMonthlyPageBreakup(req, res, next) {
        PageUpdate.aggregate([
            { $match: { date: {$gte: new Date(req.body.startDate), $lt: new Date(req.body.endDate)} }},
            { $group: { _id: {month: {$month:"$date"}}, pagesCompleted: {$sum: "$pagesCompleted"}}},
            { $sort: { "month": -1 } }
            ])
            .then(result => {
                res.send(result);
            })
            .catch(next);
    }
}