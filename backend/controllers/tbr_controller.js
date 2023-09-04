const Tbr = require('../models/tbr');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'kenobi'});
    },

    create(req, res, next)  {
        const TbrProps = req.body;
        Tbr.create(TbrProps)
                .then((Tbr) => res.send(Tbr))
                .catch(next);
    },

    delete(req, res, next)  {
        const bookId = req.body.id;
        Book.findByIdAndDelete(bookId)
            .then((result) => {
                res.send(result)
            })
            .catch(next);
    },

    fetchAllTbr(req, res, next)  {
        const buildQuery = {};

        buildQuery.dateCompleted = {
            $exists: false
        }
        Tbr.find(buildQuery)
            .then((books) =>
            res.send(books))
            .catch(next);
    },

}