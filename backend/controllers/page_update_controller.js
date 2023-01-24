const PageUpdate = require('../models/pageUpdate');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'grevious'});
    }
}