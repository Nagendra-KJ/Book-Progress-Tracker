const PageUpdate = require('../models/pageUpdate');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'grevious'});
    },

    create(req, res, next)
    {
        const PageUpdateProps = req.body;
        PageUpdate.create(PageUpdateProps)
                .then((PageUpdate) => res.send(PageUpdate))
                .catch(next);
    },
}