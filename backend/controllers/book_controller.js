const Book = require('../models/book');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'kenobi'});
    }
}